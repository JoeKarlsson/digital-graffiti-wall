class Erasers {
  constructor(paintSwatch, mongo) {
    this.paintSwatch = paintSwatch;
    this.mongo = mongo;

    this.init();
  }

  init() {
    const colorDiv = document.getElementById("colors");
    const clearButton = document.createElement("div");
    clearButton.addEventListener("click", this.eraseAll.bind(this));
    clearButton.innerHTML = "Clear";
    clearButton.className = "funcButtons";
    colorDiv.appendChild(clearButton);

    const eraserButton = document.createElement("div");
    eraserButton.addEventListener("click", this.eraseSquare.bind(this));
    eraserButton.innerHTML = "Eraser";
    eraserButton.className = "funcButtons";
    colorDiv.appendChild(eraserButton);
  }

  eraseAll() {
    for (let k = 0; k < this.paintSwatch.getRowHeight(); k++) {
      for (let l = 0; l < this.paintSwatch.getRowWidth(); l++) {
        const cellID = l + " " + k;
        let cell = document.getElementById(cellID);
        cell.style.background = "rgb(255,255,255)";
      }
    }
    this.mongo.updateAllPixels("rgb(255,255,255)");
  }

  eraseSquare() {
    this.paintSwatch.setCurrentColor("rgb(255,255,255)");
  }
}
