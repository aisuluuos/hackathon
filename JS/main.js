const API = "http://localhost:8000/menu";
document.getElementById("navbar-toggle").addEventListener("click", function () {
  const navbarMenu = document.querySelector(".navbar-menu");
  navbarMenu.classList.toggle("active");
});
