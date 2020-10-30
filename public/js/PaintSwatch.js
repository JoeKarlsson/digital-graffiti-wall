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
      const grid = document.getElementById("grid");
      grid.appendChild(newRow);

      for (let x = 0; x < this.rowWidth; x++) {
        let newCell = document.createElement("div");

        newCell.id = x + " " + y;
        newCell.className = "gridSquares";

        newCell.addEventListener(
          "pointerdown",
          this.clickGrid.bind(this, newCell)
        );

        newCell.addEventListener(
          "pointerover",
          this.doFillOnHover.bind(this, newCell)
        );

        newCell.addEventListener(
          "pointerenter",
          this.doFillOnHover.bind(this, newCell)
        );

        document.getElementById("gridRows" + y).appendChild(newCell);
      }

      document.body.addEventListener(
        "pointerup",
        this.mouseUpUpdate.bind(this)
      );
      document.body.addEventListener(
        "pointercancel",
        this.mouseUpUpdate.bind(this)
      );
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
      let divIDArr = this.convertCellIdToArray(cell.id);
      this.mongo.updateOnePixel(divIDArr, this.currentColor);
    }
    this.fillOnHover = true;
  }

  doFillOnHover(cell) {
    console.log(cell);
    if (this.fillOnHover === true) {
      if (cell.style.backgroundColor !== this.currentColor) {
        cell.style.backgroundColor = this.currentColor;
        let divIDArr = this.convertCellIdToArray(cell.id);
        this.mongo.updateOnePixel(divIDArr, this.currentColor);
      }
    }
  }

  touch2Mouse(e) {
    let theTouch = e.changedTouches[0];
    let mouseEv;

    switch (e.type) {
      case "touchstart":
        mouseEv = "mousedown";
        break;
      case "touchend":
        mouseEv = "mouseup";
        break;
      case "touchmove":
        mouseEv = "mousemove";
        break;
      // case "touchmove":
      //   mouseEv = "mouseover";
      //   break;
      default:
        return;
    }

    var mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent(
      mouseEv,
      true,
      true,
      window,
      1,
      theTouch.screenX,
      theTouch.screenY,
      theTouch.clientX,
      theTouch.clientY,
      false,
      false,
      false,
      false,
      0,
      null
    );
    theTouch.target.dispatchEvent(mouseEvent);

    e.preventDefault();
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
