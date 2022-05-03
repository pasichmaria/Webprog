var active = document.getElementById("burger");
active.addEventListener("click", function() {
  this.classList.toggle("active");
  var menuShow = document.getElementById("menu");
  menuShow.classList.toggle("show");
});