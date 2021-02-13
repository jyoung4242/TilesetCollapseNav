var numL0tilesets = 0
var numL1tilesets = 0
var numL2tilesets = 0

/**********************************************
function addEl - short for add eleement
let's you pass a list of elements and nest them into each other
got this from StackOverflow
usage addEl(toplevelElementID, nextEleementID, ....)
**********************************************/

function addEl() {
  var nodes = arguments
  for (var i = 1; i < nodes.length; i++) {
    nodes[i - 1].appendChild(nodes[i])
  }
}

/**********************************************
function dropdown( passing id )
this is the onclick event to add the css class "cont--dropdown" to the target id passed"
**********************************************/
function dropdown(id) {
  var divstr = id.id
  var butstr = id.id
  var layerstr = id.id.split("_")
  if (layerstr[1].charAt(0) != "T") {
    //This section for upper tier button presses
    divstr = layerstr[0] + "_Div"
  } else {
    //This section for lower tier button presses
    divstr = layerstr[0] + "_" + layerstr[1] + "_Div"
  }

  document.getElementById(divstr).classList.toggle("cont--dropdown")
}

/**********************************************
function loadTileSet( e as event )
this is the onchange event for all the file input elements
-loads in the file to filereader
-after file load is complete, parses out the triggering elements

**********************************************/

function loadTileSet(e) {
  //get triggering button data
  //loadfile
  var file = e.target.files[0]
  var reader = new FileReader()
  var filename = e.target.files[0].name

  reader.onload = function () {
    var Level = "L0"
    var Layer = "0"
    var TileSet = 0

    //there are three levels of "tilesets"
    //so based on which one triggers the event
    //increment the tileset number and set the parsing info
    switch (e.target.id) {
      case "L0_file":
        console.log("Layer 0")
        Level = "L0"
        Layer = "0"
        numL0tilesets++
        TileSet = numL0tilesets

        break
      case "L1_file":
        console.log("Layer 1")
        Level = "L1"
        Layer = "1"
        numL1tilesets++
        TileSet = numL1tilesets
        break
      case "L2_file":
        console.log("Layer 2")
        Level = "L2"
        Layer = "2"
        numL2tilesets++
        TileSet = numL2tilesets
        break

      default:
    }

    //create div and button element with canvas and img inside the div
    //creating the button with the right id, innertext, class, and creating the onclick event
    const newButton = document.createElement("BUTTON")
    var buttontext = "Layer " + Layer + ", Tileset " + TileSet.toString()
    newButton.innerHTML = buttontext
    buttontext = Level + "_T" + TileSet.toString() + "_Button"
    newButton.id = buttontext
    buttontext = "t" + TileSet.toString() + "l" + Layer + "button tilebutton"
    newButton.className = buttontext
    newButton.onclick = function () {
      dropdown(newButton)
    }

    //creating the div  with the right id, class
    //this div holds the canvas and image elements
    const newDiv = document.createElement("DIV")
    var divtext = Level + "_T" + TileSet.toString() + "_Div"
    newDiv.id = divtext
    divtext = "t" + TileSet.toString() + "l" + Layer + "cont tilesetdiv"
    newDiv.className = divtext

    //creating the canvas and image with the right id, class
    const newCanvas = document.createElement("CANVAS")
    var canvastext = Level + "_T" + TileSet.toString() + "_canvas"
    newCanvas.id = canvastext
    newCanvas.className = "tileset"
    const newImage = document.createElement("IMG")
    var imagetext = Level + "_T" + TileSet.toString() + "image"
    newImage.id = imagetext
    newImage.className = "images"

    //adding this to the Div that triggered the file input event
    const currentDiv = document.getElementById(Level)
    //using the addEl to properly nest everything
    addEl(newDiv, newCanvas)
    addEl(newDiv, newImage)
    addEl(currentDiv, newButton)
    addEl(currentDiv, newDiv)

    //now add tileset to the canvase created
    newImage.addEventListener(
      "load",
      () => {
        var ctx = newCanvas.getContext("2d")
        ctx.drawImage(newImage, 0, 0, 320, 200)
      },
      false
    )
    newImage.src = reader.result

    //update buttontext with the new text
    newButton.innerHTML = newButton.innerHTML + "   => " + filename
  }
  reader.readAsDataURL(file)
}

/**********************************************
function init()
sets up the onchange events in the file input elements
**********************************************/

function init() {
  //tie the inputfile element labels to an change event listener
  var inputs = document.querySelectorAll(".files")
  //setup the onchange events for all the file load elements
  Array.prototype.forEach.call(inputs, (input) => {
    input.addEventListener("change", (e) => loadTileSet(e))
  })
}
