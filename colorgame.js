//linked

var colors = generateRandomColors(6)
var pickedColor = pickColor()
var squares = document.querySelectorAll(".square")
var h1 = document.querySelector("h1")
var colorDisplay = document.getElementById("colorDisplay")
var messageDisplay = document.querySelector("#messageDisplay")
var resetButton = document.querySelector("#resetButton")
resetButton.addEventListener("click", reset)
initialize()



function reset() {
  colors = generateRandomColors(6)
  pickedColor = pickColor()
  messageDisplay.textContent = ""
  h1.style["background-color"] = "inherit"
  initialize()
}

function initialize(){
  for(var i = 0; i < squares.length; i++){
    //add color to square
    squares[i].style["background-color"] = colors[i]

    //if they are clicked on, return the color of the square.
    squares[i].addEventListener("click", function() {
      //compare color to pickedColor
      if (this.style["background-color"] === pickedColor) {
        messageDisplay.textContent = "Correct"
        h1.style["background-color"] = pickedColor
        changeColors(pickedColor)
      }
      else {
        this.style["background-color"] = "#232323"
        messageDisplay.textContent = "Try Again"
      }
    })
  }
  colorDisplay.textContent = pickedColor
}

function changeColors(color) {
  squares.forEach(function(sq){
    sq.style["background-color"] = color
  })
}
function generateRandomColors(num) {
  //make array
  var arr = []
  //add num colors to array
  for(var i = 0; i < num; i++) {
    arr.push(randomRGBColor())
  }
  console.log(arr)
  //return
  return arr;
}
function randomRGBColor() {
  rgb = []
  console.log("here")
  for(var i = 0; i < 3; i++) {
    rgb.push(Math.floor(Math.random() * 256))
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length)
  return colors[random]
}
// squares.forEach(function(sq) {
//
//   sq.style["background-color"] = `rgb(${red}, ${green}, ${blue})`;
// })
