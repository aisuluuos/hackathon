const API = "http://localhost:8000/menu";
document.addEventListener("DOMContentLoaded", function () {
  const cartLink = document.getElementById("cart-link");
  const modal = document.getElementById("cart-modal");
  const closeButton = document.querySelector(".close-button");

  cartLink.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", function () {
    const query = searchInput.value;
    alert("Вы ищете: " + query);
  });
});
