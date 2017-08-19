// Check off todo by clicking
// IMPORTANT: we had to add the listener on 'ul' because it was present when page first
// loaded.
$("ul").on("click", "li", function(){
  // $(this).css("color", "gray")
  // $(this).css("text-decoration", "line-through")
  // if ($(this).css("color") === "rgb(128, 128, 128)") {
  //   $(this).css({
  //     textDecoration: "none",
  //     color: "black"
  //   })
  // }
  // else {
  //   $(this).css({
  //     textDecoration: "line-through",
  //     color: "gray"
  //   })
  // }
  $(this).toggleClass("completed")

})
$("ul").on("click", "span", function(e){
  $(this).parent().fadeOut(500, function(){
    $(this).remove()
  })
  e.stopPropagation()
})
$("input[type='text']").keypress(function(e){
  if (e.which === 13) {
    // get text from input
    var todoText = $(this).val()
    $(this).val("")
    $("ul").append(`<li><span><i class='fa fa-trash'></i></span> ${todoText}</li>`)
  }
})
$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
})
