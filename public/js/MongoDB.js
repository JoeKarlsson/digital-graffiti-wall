class MongoDB {
  constructor() {}

  async init() {
    console.log("hit");
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

      const mongo = app.services.mongodb("mongodb-atlas");
      const mongoCollection = mongo.db(CONFIG.db).collection(CONFIG.collection);

      const findAllPixels = {};
      const data = await mongoCollection.find(findAllPixels);
      console.log(data);
      return mongoCollection;
    } catch (err) {
      console.error(err);
    }
  }
}
