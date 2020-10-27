window.onload = async () => {
  const mongo = new MongoDB();
  await mongo.init();
  const paintSwatch = new PaintSwatch(mongo);
  new Erasers(paintSwatch, mongo);
};
