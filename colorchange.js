button = document.querySelector("button")
body = document.querySelector("body")
button.addEventListener("click", changeBackground)

function changeBackground() {
  body.classList.toggle("change_color")
}
