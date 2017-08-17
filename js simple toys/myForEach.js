//similar, but not quite right
function myForEach(array, func){
  for(i = 0; i < array.length; i++){
    func(array[i])
  }
}

colors = ["red", "green", "blue"]
myForEach(colors, console.log)
//extending the array object
Array.prototype.myForEach = function(func) {
  for(i = 0; i < this.length; i++){
    func(this[i])
  }
}

//with a prebuilt function
colors.myForEach(console.log)

//with an anonymous function
colors.myForEach(function(color) {
  console.log("My favorite color is ", color)
})
