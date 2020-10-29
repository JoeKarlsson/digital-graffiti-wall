class PaintSwatch {
  constructor(mongo) {
    this.mongo = mongo;
    this.colorHeight = 1;
    this.colorWidth = 8;
    this.rowHeight = 32;
    this.rowWidth = 32;
    this.fillOnHover = false;
    this.currentColor = "rgb(0,0,0)";

    this.init();
  }

  async init() {
    await this.initColorPallete();
    await this.initPixelGrid();
  }

  async initColorPallete() {
    let pixelIdx = -1;

    for (let i = 0; i < this.colorHeight; i++) {
      let newColorRow = document.createElement("div");
      // newColorRow.className = "cRows";
      newColorRow.id = "rows" + i;
      document.getElementById("colors").appendChild(newColorRow);
      for (let j = 0; j < this.colorWidth; j++) {
        let newColorCell = document.createElement("div");
        newColorCell.id = pixelIdx;
        newColorCell.className = "nes-btn";
        newColorCell.style.backgroundColor = colorSelection[pixelIdx];
        newColorCell.addEventListener(
          "click",
          this.clickColor.bind(this, newColorCell)
        );
        document.getElementById("rows" + i).appendChild(newColorCell);
        pixelIdx++;
      }
    }
  }

  async initPixelGrid() {
    for (let y = 0; y < this.rowHeight; y++) {
      let newRow = document.createElement("div");
      newRow.className = "gRows";
      newRow.id = "gridRows" + y;
      document.getElementById("grid").appendChild(newRow);

      for (let x = 0; x < this.rowWidth; x++) {
        let newCell = document.createElement("div");

        newCell.id = x + " " + y;
        newCell.className = "gridSquares";

        newCell.addEventListener(
          "mousedown",
          this.clickGrid.bind(this, newCell)
        );
        newCell.addEventListener(
          "mouseover",
          this.doFillOnHover.bind(this, newCell)
        );
        document.getElementById("gridRows" + y).appendChild(newCell);
      }
      document.body.addEventListener("mouseup", this.mouseUpUpdate.bind(this));
    }
    this.updatePixelGrid();
  }

  updatePixelGrid() {
    let pixelIndex = 0;
    this.mongo.getCurrPixelGrid().then((pixels) => {
      for (let y = 0; y < this.rowHeight; y++) {
        for (let x = 0; x < this.rowWidth; x++) {
          if (
            pixels[pixelIndex].coord.x === x &&
            pixels[pixelIndex].coord.y === y
          ) {
            const cellID = x + " " + y;
            const cell = document.getElementById(cellID);
            cell.style.backgroundColor = pixels[pixelIndex].color;
          }
          pixelIndex++;
        }
      }
    });
  }

  clickColor(cell) {
    this.currentColor = cell.style.backgroundColor;
  }

  convertCellIdToArray(id) {
    return id.split(" ").map((coord) => parseInt(coord));
  }

  clickGrid(cell) {
    if (cell.style.backgroundColor !== this.currentColor) {
      cell.style.backgroundColor = this.currentColor;
      this.fillOnHover = true;
      let divIDArr = this.convertCellIdToArray(cell.id);
      this.mongo.updateOnePixel(divIDArr, this.currentColor);
    }
  }

  doFillOnHover(cell) {
    if (this.fillOnHover === true) {
      if (cell.style.backgroundColor !== this.currentColor) {
        cell.style.backgroundColor = this.currentColor;
        let divIDArr = this.convertCellIdToArray(cell.id);
        this.mongo.updateOnePixel(divIDArr, this.currentColor);
      }
    }
  }

  mouseUpUpdate() {
    this.fillOnHover = false;
  }

  getRowHeight() {
    return this.rowHeight;
  }

  getRowWidth() {
    return this.rowWidth;
  }

  getCurrentColor() {
    return this.currentColor;
  }

  setCurrentColor(color) {
    this.currentColor = color;
  }
}
