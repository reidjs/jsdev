$("li").click(function(){
  $(this).css("color", "red");
  console.log("clicked on " + $(this).text());
});
$("input").keypress(function(e){
  //jQuery.event.which tells you the ASCII key value
  if (e.which == 13) console.log("enter pressed");
});
$("h1").on("click", function(e){
  console.log(e);
  $(this).css("color","purple")
})
$("input").on("keypress", function(){
  console.log("key pressed")
})
$("li").on("mouseenter", function(){
  $(this).css("font-weight", "bold")
})
$("li").on("mouseleave", function(){

  $(this).css("font-weight", "normal")

})
