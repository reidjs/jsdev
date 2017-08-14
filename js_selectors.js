// Four different ways of selecting the first paragraph from the file
x = document.querySelector("p")
y = document.querySelectorAll("p")[0]
z = document.getElementById("first")
v = document.getElementsByClassName("special")[0]
// best/recommended way for elements with ids
w = document.querySelector("#first")
console.log(x)
console.log(y)
console.log(z)
console.log(v)
console.log(w)
//changing the style
//x.classList.remove("some-class")
// setInterval(toggleClass, 1000)
function toggleClass(){
  x.classList.toggle( "some-class")
}
//toggle is not an array! it is a node list i think. You cannot do array methods.

last_p = document.querySelector("#last")
ul = document.querySelector("ul")
//textContent takes pure text without html elements
//innerHTML returns html contained within element WITH the tags
console.log(last_p.innerHTML)
console.log(ul.innerHTML)
//if you change something with innerHTML it will render the html
document.querySelector("h1").innerHTML = "hello <i> there </i>"
//you can change the attributes using the getAttribute and setAttribute methods
link = document.querySelector("a")
links_to = link.getAttribute("href")
console.log(links_to)
link.setAttribute("href","www.bing.com")
console.log(link.getAttribute("href"))
//DOM events
h1 = document.querySelector("h1")
console.log(h1)
h1.addEventListener("click", function() {
  this.style.background="orange";
  this.textContent = "helloffff"
})

ul = document.querySelector("ul").addEventListener("click", function(){
  console.log("UL CLICKED")
})

lis = document.querySelectorAll("li")
for(i = 0; i < lis.length; i++){
  lis[i].addEventListener("click", changeText, lis[i])
  lis[i].addEventListener("click", function() {
    this.style.color = "blue"
  })
}
function changeText(element) {
  console.log(element)
  element.textContent = "changed to this"
}
