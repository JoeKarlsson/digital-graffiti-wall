class PaintSwatch {
  constructor() {
    this.colorHeight = 1;
    this.colorWidth = 8;
    this.rowHeight = 32;
    this.rowWidth = 32;
    this.fillOnHover = false;
    this.currentColor = "rgb(0,0,0)";
    this.countDiv = -1;

    this.init();
  }

  init() {
    const colorButtton = document.getElementById("headerButton");
    const colorSwatch = document.getElementById("colors");

    document.getElementById("header").appendChild(colorButtton);
    colorButtton.addEventListener("click", () => {
      if (colorSwatch.style.display === "none") {
        colorSwatch.style.display = "block";
      } else {
        colorSwatch.style.display = "none";
      }
    });

    for (let i = 0; i < this.colorHeight; i++) {
      let newColorRow = document.createElement("div");
      newColorRow.className = "cRows";
      newColorRow.id = "rows" + i;
      document.getElementById("colors").appendChild(newColorRow);
      for (let j = 0; j < this.colorWidth; j++) {
        let newColorCell = document.createElement("div");
        this.countDiv++;
        newColorCell.id = this.countDiv;
        newColorCell.className = "squares";
        newColorCell.style.backgroundColor = colorSelection[this.countDiv];
        newColorCell.addEventListener(
          "click",
          this.clickColor.bind(this, newColorCell)
        );
        document.getElementById("rows" + i).appendChild(newColorCell);
      }
    }

    for (let k = 0; k < this.rowHeight; k++) {
      let newRow = document.createElement("div");
      newRow.className = "gRows";
      newRow.id = "gridRows" + k;
      document.getElementById("grid").appendChild(newRow);

      for (let l = 0; l < this.rowWidth; l++) {
        let newCell = document.createElement("div");

        this.countDiv++;
        newCell.id = l + " " + k;
        newCell.className = "gridSquares";

        newCell.x = l;
        newCell.y = k;

        newCell.addEventListener(
          "mousedown",
          this.clickGrid.bind(this, newCell)
        );
        newCell.addEventListener(
          "mouseover",
          this.doFillOnHover.bind(this, newCell)
        );
        document.getElementById("gridRows" + k).appendChild(newCell);
      }
      document.body.addEventListener("mouseup", this.mouseUpUpdate.bind(this));
    }
  }

  clickColor(cell) {
    this.currentColor = cell.style.backgroundColor;
  }

  clickGrid(cell) {
    if (cell.style.backgroundColor !== this.currentColor) {
      cell.style.backgroundColor = this.currentColor;
      this.fillOnHover = true;
      let divClicked = cell.id;
      let divClickedStr = divClicked.toString();
      let pixelThingToSetOnFirebase = {};
      pixelThingToSetOnFirebase[divClickedStr] = this.currentColor;
    }
  }

  doFillOnHover(cell) {
    if (this.fillOnHover === true) {
      if (cell.style.backgroundColor !== this.currentColor) {
        cell.style.backgroundColor = this.currentColor;
        let divClicked = cell.id;
        let pixelThingToSetOnFirebase = {};
        pixelThingToSetOnFirebase[divClicked] = this.currentColor;
      }
    }
  }

  mouseUpUpdate() {
    this.fillOnHover = false;
  }

  getColorHeight() {
    return this.colorHeight;
  }

  setColorHeight(newColorHeight) {
    this.colorHeight = newColorHeight;
  }

  getColorHeight() {
    return this.colorHeight;
  }

  getColorWidth() {
    return this.colorWidth;
  }

  setColorWidth(newColorWidth) {
    this.colorWidth = newColorWidth;
  }

  getRowHeight() {
    return this.rowHeight;
  }

  setRowHeight(newHeight) {
    this.rowHeight = newHeight;
  }

  getRowWidth() {
    return this.rowWidth;
  }

  setRowWidth(newWidth) {
    this.rowWidth = newWidth;
  }

  getCountDiv() {
    return this.countDiv;
  }

  setCountDiv(newCount) {
    this.countDiv = newCount;
  }

  getFillOnHover() {
    return this.fillOnHover;
  }

  setFillOnHover(fillState) {
    this.fillOnHover = fillState;
  }

  getCurrentColor() {
    return this.currentColor;
  }

  setCurrentColor(color) {
    console.log(color);
    this.currentColor = color;
  }

  getCountDiv() {
    return this.countDiv;
  }

  setCountDiv(setter) {
    this.countDiv = setter;
  }

  sendRGB() {
    let rgb = this.currentColor;
    let x = rgb
      .substring(4, rgb.length - 1)
      .replace(/ /g, "")
      .split(",");
    return x;
  }
}
