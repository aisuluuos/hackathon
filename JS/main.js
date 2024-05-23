const API = "http://localhost:8000/menu";
const searchInput = document.getElementById("search-input");
//!--------------------SEARCH-------------------------
document.addEventListener("DOMContentLoaded", function () {
  searchInput.addEventListener("input", function (e) {
    searchValue = e.target.value;
    readFood();
  });
});
