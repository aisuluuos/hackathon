const API = "http://localhost:8000/menu";
const inpName = document.querySelector("#inpName");
const inpIngr = document.querySelector("#inpIngr");
const inpImg = document.querySelector("#inpImg");
const inpPrice = document.querySelector("#inpPrice");
const btnAdd = document.querySelector("#btnAdd");
const foodSection = document.querySelector(".foodSection");
const collapseThree = document.querySelector("#collapseThree");
const searchInput = document.getElementById("search-input");
let searchValue = "";
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");
let countPage = 1;
let currentPage = 1;
//!-------------CREATE---------------
btnAdd.addEventListener("click", () => {
  if (
    !inpName.value.trim() ||
    !inpIngr.value.trim() ||
    !inpImg.value.trim() ||
    !inpPrice.value.trim()
  ) {
    alert("Введите данные");
    return;
  }
  let newPizza = {
    pizzaName: inpName.value,
    pizzaIngr: inpIngr.value,
    pizzaImg: inpImg.value,
    pizzaPrice: inpPrice.value,
  };
  createFood(newPizza);
  readFood();
  inpName.value = "";
  inpIngr.value = "";
  inpImg.value = "";
  inpPrice.value = "";
  collapseThree.classList.toggle("show");
});
function createFood(pizza) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(pizza),
  });
}
//!-----------READ---------------
async function readFood() {
  const res = await fetch(
    `${API}?q=${searchValue}&_page=${currentPage}&_limit=8`
  );
  const data = await res.json();
  foodSection.innerHTML = "";
  data.forEach((elem) => {
    foodSection.innerHTML += `
      <div class="card m-4 cardBook" style="width: 250px">
          <img style= "height: 250px" src="${elem.pizzaImg}" alt="${elem.pizzaName}" />
          <div class="card-body">
            <h6 class="card-title">${elem.pizzaName}</h6>
            <p class="card-text">${elem.pizzaIngr}</p>
            <span>${elem.pizzaPrice}</span>
            <button type="button" class="btn btn-danger btnDelete" id = "${elem.id}">
            Удалить
          </button>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-info btnEdit" id = "${elem.id}">
          Редактировать
        </button>
        <button type="button" style="background-color:yellow" id = "${elem.id}" class="btn btn-info btnDetail">Детальный обзор</button>
          </div>
        </div>
      `;
  });
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
//!-----------------PAGINATION--------------------------
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
});
