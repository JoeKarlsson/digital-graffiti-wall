class MongoDB {
  constructor() {
    this.mongoCollection = null;
  }

  async init() {
    const appId = CONFIG.appID; // Set Realm App ID here.
    const appConfig = {
      id: appId,
      timeout: 10000, // timeout in number of milliseconds
    };
    let user;

    try {
      const app = new Realm.App(appConfig);

      // an authenticated user is required to access a MongoDB instance
      user = await app.logIn(Realm.Credentials.anonymous());

      const mongoService = app.services.mongodb("mongodb-atlas");
      this.mongoCollection = mongoService
        .db(CONFIG.db)
        .collection(CONFIG.collection);

      await this.seedDB();
    } catch (err) {
      console.error(`Failed to connect to MongoDB: ${err}`);
    }
  }

  async seedDB() {
    //check if we need to seed the DB
    await this.mongoCollection
      .count({})
      .then((count) => {
        if (count !== 1024) {
          console.log("Started to seed DB");
          this.mongoCollection
            .deleteMany({})
            .then(() => {
              const pixels = [];
              for (let y = 0; y < 32; y++) {
                for (let x = 0; x < 32; x++) {
                  const pixel = {
                    color: "rgb(255,255,255)",
                    coord: {
                      x,
                      y,
                    },
                  };
                  pixels.push(pixel);
                }
              }

              return this.mongoCollection
                .insertMany(pixels, {
                  writeConcern: "majority",
                })
                .then((result) => {
                  setTimeout(() => {}, 2000);
                  console.log(`Database was seeded with ${result} documents`);
                  return result;
                })
                .catch((err) => console.error(`Failed to seed the DB: ${err}`));
            })
            .catch((err) => console.error(`Failed to clear the DB: ${err}`));
        }
      })
      .catch((err) => console.error(`Failed to get collection count: ${err}`));
  }

  getCurrPixelGrid() {
    return this.mongoCollection
      .aggregate([
        {
          $match: {},
        },
        { $sort: { "coord.y": 1, "coord.x": 1 } },
      ])
      .then((result) => result)
      .catch((err) =>
        console.error(`Failed to find and sort pixel grid: ${err}`)
      );
  }

  async updateOnePixel(cellID, color) {
    const query = {
      $and: [{ "coord.x": { $eq: cellID[0] }, "coord.y": { $eq: cellID[1] } }],
    };
    const update = { $set: { color } };
    const options = {};

    return this.mongoCollection
      .findOneAndUpdate(query, update, options)
      .then((result) => result)
      .catch((err) => console.error(`Failed to upsert document: ${err}`));
  }

  async updateAllPixels(color) {
    const query = {};
    const update = { $set: { color } };
    const options = { upsert: true };

    return this.mongoCollection
      .updateMany(query, update, options)
      .then((result) => result)
      .catch((err) => console.error(`Failed to update items: ${err}`));
  }
}
