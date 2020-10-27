window.onload = async () => {
  const mongo = await new MongoDB().init();
  const paintSwatch = new PaintSwatch(mongo);
  new Erasers(paintSwatch, mongo);
};
