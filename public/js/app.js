var painterGenerator = createPaintingAbility();

window.onload = function () {
  var colorBut = document.getElementById("headerButton");
  var colorSwatch = document.getElementById("colors");

  document.getElementById("header").appendChild(colorBut);
  colorBut.addEventListener("click", function () {
    if (colorSwatch.style.display === "none") {
      colorSwatch.style.display = "block";
    } else {
      colorSwatch.style.display = "none";
    }
  });

  for (var i = 0; i < painterGenerator.getColorHeight(); i++) {
    var newColorRow = document.createElement("div");
    newColorRow.className = "cRows";
    newColorRow.id = "rows" + i;
    document.getElementById("colors").appendChild(newColorRow);
    for (var j = 0; j < painterGenerator.getColorWidth(); j++) {
      var newColorCell = document.createElement("div");
      countDiv++;
      newColorCell.id = countDiv;
      newColorCell.className = "squares";
      newColorCell.style.backgroundColor = colorSelection[countDiv];
      newColorCell.addEventListener("click", painterGenerator.clickColor);
      document.getElementById("rows" + i).appendChild(newColorCell);
    }
  }

  for (var k = 0; k < painterGenerator.getRowHeight(); k++) {
    var newRow = document.createElement("div");
    newRow.className = "gRows";
    newRow.id = "gridRows" + k;
    document.getElementById("grid").appendChild(newRow);

    for (var l = 0; l < painterGenerator.getRowWidth(); l++) {
      var newCell = document.createElement("div");

      countDiv++;
      newCell.id = l + " " + k;
      newCell.className = "gridSquares";

      newCell.x = l;
      newCell.y = k;

      newCell.addEventListener("mousedown", painterGenerator.clickGrid);
      newCell.addEventListener("mouseover", painterGenerator.doFillOnHover);
      document.getElementById("gridRows" + k).appendChild(newCell);
    }
    document.body.addEventListener("mouseup", painterGenerator.mouseUpUpdate);
  }
  erasers();
};
