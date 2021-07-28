"use strict";
const API_URL = "https://raw.githubusercontent.com/Anna-Naily/json/main";
function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject("Error");
        }
      }
    };
    xhr.send();
  });
}
//Каталог товаров
class GoodsList {
  constructor() {
    this.total = 0;
    this.allProducts = [];

    //this.createAllProducts();
    this.fetchGoods();
  }
  fetchGoods() {
    makeGETRequest(`${API_URL}/catalogData.json`).then((value) => {
      this.allProducts = JSON.parse(value);
      this.renderProductsOnPage();
      //Регистрирует слушатель на кнопках товаров
      this.addListener();
      //Подсчитывает общую стоимость товаров в каталоге
      this.totalSumProducts();
    });
  }
  //Отрисовка продуктов на странице
  renderProductsOnPage() {
    let navigationPage = document.querySelector(".navigation-page");
    let productCardBar = `<div class="product-card-bar"><ul class="item-card-bar">`;
    for (let i = 0; i < this.allProducts.length; i++) {
      productCardBar += `<li class="item-products card-icon">
    <a class="card-link" href="single_page.html">
      <div class="picture-card">
        <img class="img-product" src=${this.allProducts[i].image} alt="photo" />
      </div>
      <h4 class="name-product">${this.allProducts[i].product_name}</h4>
      <div class="text-rating-block">
        <p class="price">$${this.allProducts[i].price.toFixed(2)}</p>
        <div class="rating-product">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>
    </a>
    <button data-id="${this.allProducts[i].id_product}" class="add-product">
      <img class="cart" src="image/white-cart.svg" alt="white-cart" />
      Add to cart
    </button>
  </li>`;
    }
    productCardBar += `</ul></div>`;
    navigationPage.insertAdjacentHTML("beforebegin", productCardBar);
  }
  //функция задает слушатели на кнопки добавления товаров
  addListener() {
    let buttons = document.querySelectorAll(".add-product");
    buttons.forEach(function (buttonEl) {
      buttonEl.addEventListener("click", addProduct);
    });
    addListenerDelete();
  }
  //Метод, определяющий суммарную стоимость всех товаров в каталоге
  totalSumProducts() {
    for (let i = 0; i < this.allProducts.length; i++) {
      this.total += this.allProducts[i].price;
    }
    console.log(this.total);
  }
}
//Продукты в корзине
class ProductsInCart {
  constructor() {
    this.basket = {};
    //Массив карточек товаров, добавленных в корзину
    this.renderProducts = [];
  }
  //Функция добавления и увеличения товаров в корзине
  addProduct(id) {
    if (!(id in this.basket)) {
      this.basket[id] = 1;
    } else {
      this.basket[id]++;
    }
  }
  //Функция удаления товаров из корзины
  removeProduct(id) {
    if (id in this.basket) {
      this.basket[id]--;
    }
  }
  //Функция рисует товар в окне корзины.
  renderProductInBasket() {
    let blockForProductsInCart = document.querySelector(".block-for-products");
    if (this.renderProducts.length > 0) {
      this.renderProducts = [];
      //обнуление
      blockForProductsInCart.innerHTML = ``;
    }
    let renderArr = goodlist.allProducts;
    for (let i = 0; i < renderArr.length; i++) {
      if (i in this.basket && this.basket[i] > 0) {
        let image = renderArr[i].image;
        let name = renderArr[i].product_name;
        let price = renderArr[i].price;
        let count = this.basket[i];
        let idSpan = renderArr[i].id_product;
        let productBox = `<div class="cart-element">
                    <img
                      class="img-cart" width="100px" height="100px"
                      src="${image}"
                      alt="photo"
                    />
                    <div class="cart-info">
                      <h2 class="heading-cart">${name}</h2>
                      <div class="rating-block">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star-half-alt"></i>
                      </div>
                      <p class="count-cart">${count} x $${price}</p>
                    </div>
                    <span data-idSpan="${idSpan}" class="delete-cart">
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </div>`;
        this.renderProducts.push(productBox);
      }
    }
    this.renderProducts.forEach((elem) => {
      blockForProductsInCart.insertAdjacentHTML("beforeend", elem);
    });
  }
}
let countBuyEl = document.querySelector(".count-buy");
// Класс корзины
class Cart {
  constructor() {}
  showHidden() {
    let cartEl = document.querySelector(".cart-block");
    cartEl.classList.toggle("hidden");
  }
  //Функция подсчета общей стоимости корзины.
  recalculationTotalSum() {
    let totalPriceEl = document.querySelector(".totalPrice");
    let totalSum = 0;
    for (let id in productsInCart.basket) {
      totalSum += productsInCart.basket[id] * goodlist.allProducts[id].price;
    }
    totalPriceEl.textContent = "$ " + totalSum.toFixed(2);
  }
  //Функция отображения индикатора количества продуктов в корзине.
  showLogoCart() {
    let countLogo = Number(countBuyEl.textContent);
    if (countLogo > 0) {
      countBuyEl.style.display = "block";
    } else {
      countBuyEl.style.display = "none";
    }
  }
  //Функция увеличивает количество товаров на логотипе
  increaseCountLogo() {
    countBuyEl.textContent = Number(countBuyEl.textContent) + 1;
  }
  //Функция уменьшает количество товаров на логотипе
  decreaseCountLogo() {
    countBuyEl.textContent = Number(countBuyEl.textContent) - 1;
  }
}

let goodlist = new GoodsList();
let cart = new Cart();
let productsInCart = new ProductsInCart();

// //Обработчик логотипа корзины. Открывает окно корзины с классом hidden.
let buttonCartEl = document.querySelector(".cart-details");
buttonCartEl.addEventListener("click", function () {
  cart.showHidden();
});

function addProduct(event) {
  let id = event.currentTarget.getAttribute("data-id");
  productsInCart.addProduct(id);
  productsInCart.renderProductInBasket();
  cart.recalculationTotalSum();
  addListenerDelete();
  cart.increaseCountLogo();
  cart.showLogoCart();
}
function removeProduct(event) {
  let id = event.currentTarget.getAttribute("data-idSpan");
  productsInCart.removeProduct(id);
  productsInCart.renderProductInBasket();
  cart.recalculationTotalSum();
  //рекурсия функции удаления
  addListenerDelete();
  cart.decreaseCountLogo();
  cart.showLogoCart();
}

//функция задает слушатели на кнопки удаления товаров
function addListenerDelete() {
  let buttonsDelete = document.querySelectorAll(".delete-cart");
  if (buttonsDelete.length > 0) {
    buttonsDelete.forEach(function (buttonDeleteEl) {
      buttonDeleteEl.addEventListener("click", removeProduct);
    });
  }
}
