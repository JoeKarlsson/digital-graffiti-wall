function erasers() {
  var colorDiv = document.getElementById("colors");
  var buttonMade = document.createElement("div");
  colorDiv.appendChild(buttonMade);
  buttonMade.setAttribute("onclick", "erasingAll()");
  buttonMade.innerHTML = "Clear";
  buttonMade.className = "funcButtons";

  colorDiv = document.getElementById("colors");
  buttonMade = document.createElement("div");
  colorDiv.appendChild(buttonMade);
  buttonMade.setAttribute("onclick", "eraseSquare()");
  buttonMade.innerHTML = "Eraser";
  buttonMade.className = "funcButtons";
}

var cPA = createPaintingAbility();

function erasingAll() {
  for (var k = 0; k < painterGenerator.getRowHeight(); k++) {
    for (var l = 0; l < painterGenerator.getRowWidth(); l++) {
      var pixelThingToSetOnFirebase = {};
      const cellID = l + " " + k;
      var cell = document.getElementById(cellID);
      cell.style.background = "rgb(255,255,255)";
    }
  }
}

function eraseSquare() {
  currentColor = "rgb(255,255,255)";
}
