const API = "http://localhost:8000/menu";
const searchInput = document.getElementById("search-input");
//!--------------------SEARCH-------------------------
document.addEventListener("DOMContentLoaded", function () {
  searchInput.addEventListener("input", function (e) {
    searchValue = e.target.value;
    readFood();
  });
<<<<<<< body
  pageFunc();
}
readFood();
//!----------------DELETE----------------------------
document.addEventListener("click", (e) => {
  const del_class = [...e.target.classList];
  let id = e.target.id;
  if (del_class.includes("btnDelete")) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(() => {
      readFood();
    });
  }
});
//!-------------------EDIT----------------
const inpEditName = document.querySelector("#inpEditName");
const inpEditIngr = document.querySelector("#inpEditIngr");
const inpEditImg = document.querySelector("#inpEditImg");
const inpEditPrice = document.querySelector("#inpEditPrice");
const btnEditSave = document.querySelector("#btnEditSave");

document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];
  let id = e.target.id;
  if (edit_class.includes("btnEdit")) {
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEditName.value = data.pizzaName;
        inpEditIngr.value = data.pizzaIngr;
        inpEditImg.value = data.pizzaImg;
        inpEditPrice.value = data.pizzaPrice;
        btnEditSave.setAttribute("id", data.id);
      });
  }
});

btnEditSave.addEventListener("click", (e) => {
  if (
    !inpEditName.value.trim() ||
    !inpEditIngr.value.trim() ||
    !inpEditImg.value.trim() ||
    !inpEditPrice.value.trim()
  ) {
    alert("Введите данные");
    return;
  }
  let editedMenu = {
    pizzaName: inpEditName.value,
    pizzaIngr: inpEditIngr.value,
    pizzaImg: inpEditImg.value,
    pizzaPrice: inpEditPrice.value,
  };
  editFood(editedMenu, btnEditSave.id);
});
function editFood(pizza, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(pizza),
  }).then(() => readFood());
}
//!-----------------PAGINATION-------------------------
async function pageFunc() {
  const res = await fetch(API);
  const data = await res.json();
  countPage = Math.ceil(data.length / 4);
  console.log(countPage);
}
prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readFood();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readFood();
});
//!------------------DETAIL MODAL---------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnDetail")) {
    const productId = e.target.id;
    fetch(`${API}/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        const detailContent = `
            <h5>${product.pizzaName}</h5>
            <img src="${product.pizzaImg}" alt="${product.pizzaName}" style="max-width: 100%">
            <p><strong>Ингредиенты:</strong> ${product.pizzaIngr}</p>
            <p><strong>Цена:</strong> ${product.pizzaPrice}</p>
          `;
        document.querySelector("#detailModalBody").innerHTML = detailContent;
        const detailModal = new bootstrap.Modal(
          document.getElementById("detailModal"),
          {}
        );
        detailModal.show();
      })
      .catch((error) => {
        console.error("Ошибка при загрузке детальной информации:", error);
      });
  }
=======
>>>>>>> main
});
