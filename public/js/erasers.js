class Erasers {
  constructor(paintSwatch) {
    this.paintSwatch = paintSwatch;

    this.init();
  }

  init() {
    console.log(this.eraseAll());
    const colorDiv = document.getElementById("colors");
    const eraseAllButton = document.createElement("div");
    eraseAllButton.addEventListener("click", this.eraseAll.bind(this));
    eraseAllButton.innerHTML = "Clear";
    eraseAllButton.className = "funcButtons";
    colorDiv.appendChild(eraseAllButton);

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
  }

  eraseSquare() {
    this.paintSwatch.setCurrentColor("rgb(255,255,255)");
  }
}
