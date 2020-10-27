class MongoDB {
  constructor() {
    this.mongoCollection = null;

    this.updatePixelInCloud = this.updatePixelInCloud.bind(this);
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
    } catch (err) {
      console.error(err);
    }
  }

  async updatePixelInCloud(cellID, color) {
    try {
      const query = { cellID };
      const update = {
        color,
        cellID,
      };
      const options = { upsert: true };

      this.mongoCollection
        .updateOne(query, update, options)
        .then((result) => {
          const { matchedCount, modifiedCount, upsertedId } = result;
          if (upsertedId) {
            console.log(
              `Document not found. Inserted a new document with _id: ${upsertedId}`
            );
          } else {
            console.log(`Successfully updated cell ID ${cellID} to ${color}`);
          }
          return result;
        })
        .catch((err) => console.error(`Failed to upsert document: ${err}`));
    } catch (err) {
      console.error(err);
    }
  }
}
