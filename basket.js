"use strict";
//Каталог товаров
class GoodsList {
  constructor() {
    this.total = 0;
    this.allProducts = [];
  }
  //Заполнение массива продуктов
  createAllProducts() {
    this.allProducts = [
      {
        id_product: 0,
        product_name: "MANGO PEOPLE T-SHIRT",
        price: 52,
        image: "image/product-card-1.png",
      },
      {
        id_product: 1,
        product_name: "MANGO MAN T-SHIRT",
        price: 55,
        image: "image/product-card-2.png",
      },
      {
        id_product: 2,
        product_name: "MANGO PEOPLE BAGS",
        price: 35,
        image: "image/product-card-3.png",
      },
      {
        id_product: 3,
        product_name: "MANGO PEOPLE PANTS",
        price: 44,
        image: "image/product-card-4.png",
      },
      {
        id_product: 4,
        product_name: "MANGO PEOPLE T-SHIRT",
        price: 52,
        image: "image/product-card-5.png",
      },
      {
        id_product: 5,
        product_name: "MANGO PEOPLE T-SHIRT",
        price: 52,
        image: "image/product-card-6.png",
      },
      {
        id_product: 6,
        product_name: "MANGO PEOPLE T-SHIRT",
        price: 52,
        image: "image/product-card-7.png",
      },
      {
        id_product: 7,
        product_name: "MANGO PEOPLE T-SHIRT",
        price: 52,
        image: "image/product-card-8.png",
      },
      {
        id_product: 8,
        product_name: "MANGO PEOPLE T-SHIRT",
        price: 52,
        image: "image/product-card-9.png",
      },
    ];
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
}
// Класс корзины
class Cart {
  showHidden() {
    let cartEl = document.querySelector(".cart-block");
    cartEl.classList.toggle("hidden");
  }
}
let goodlist = new GoodsList();
let cart = new Cart();
//Обработчик логотипа корзины. Открывает окно корзины с классом hidden.
let buttonCartEl = document.querySelector(".cart-details");
buttonCartEl.addEventListener("click", function () {
  cart.showHidden();
});
goodlist.createAllProducts();
goodlist.renderProductsOnPage();
goodlist.totalSumProducts();
