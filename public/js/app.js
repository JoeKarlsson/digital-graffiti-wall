window.onload = async () => {
  const mongo = await new MongoDB().init();
  // await mongoDB.init();
  console.log(mongo);
  const paintSwatch = new PaintSwatch(mongo);
  new Erasers(paintSwatch, mongo);
};
