"use strict";
const API_URL = "https://raw.githubusercontent.com/Anna-Naily/json/main";
const app = new Vue({
  el: "#app",
  data: {
    catalodUrl: "/catalogData.json",
    allProducts: [],
    filteredGoods: [],
    searchLine: "",
    isVisibleCart: false,
    basket: [],
    productsRenderInBasket: [],
    totalSum: 0,
    countLogo: 0,
  },
  methods: {
    makeGETRequest(url) {
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
    },
    fetchGoods() {
      this.makeGETRequest(`${API_URL}/catalogData.json`).then((value) => {
        this.allProducts = JSON.parse(value);
        this.filteredGoods = this.allProducts;
      });
    },
    filterGoods() {
      let regExp = new RegExp(this.searchLine, "i");
      this.filteredGoods = [];
      for (let i = 0; i < this.allProducts.length; i++) {
        if (this.allProducts[i].product_name.match(regExp)) {
          this.filteredGoods.push(this.allProducts[i]);
        }
      }
    },
    //Добавление товара в корзину
    addProduct(id) {
      //отрисовка массива продуктов в корзине (создан доп. массив, чтобы обновлялась цифра кол-ва одного продукта в коризне при нескольких нажатиях на кнопку добавления)
      this.productsRenderInBasket = [];
      for (let i = 0; i < this.filteredGoods.length; i++) {
        if (
          this.filteredGoods[i].id_product == id &&
          !this.checkAndIncreaseInBasket(id)
        ) {
          let productInCart = this.filteredGoods[i];
          productInCart.count = 1;
          this.basket.push(productInCart);
        }
      }
      this.productsRenderInBasket = this.basket;
    },
    //Удаление товара из корзины
    removeProduct(id) {
      this.productsRenderInBasket = [];
      for (let i = 0; i < this.filteredGoods.length; i++) {
        if (this.filteredGoods[i].id_product == id) {
          this.decreaseInBasket(id);
        }
      }
      this.productsRenderInBasket = this.basket;
    },
    //Проверка на наличие товара в корзине и увеличение
    checkAndIncreaseInBasket(id) {
      for (let i = 0; i < this.basket.length; i++) {
        if (this.basket[i].id_product == id) {
          this.basket[i].count++;
          return true;
        }
      }
      return false;
    },
    //Уменьшение кол-ва товаров в корзине
    decreaseInBasket(id) {
      for (let i = 0; i < this.basket.length; i++) {
        if (this.basket[i].id_product == id) {
          this.basket[i].count--;
        }
        if (this.basket[i].count <= 0) {
          this.basket.splice(i, 1);
        }
      }
    },
  },
  mounted() {
    this.fetchGoods();
  },
  computed: {
    //Расчет общей стоимости корзины
    recalculationTotalSum() {
      this.totalSum = 0;
      for (let i = 0; i < this.productsRenderInBasket.length; i++) {
        this.totalSum +=
          this.productsRenderInBasket[i].count *
          this.productsRenderInBasket[i].price;
      }
      return this.totalSum;
    },
    //Подсчет кол-ва товаров, отображающихся на логотипе корзины
    calculationCountLogo() {
      this.countLogo = 0;
      for (let i = 0; i < this.productsRenderInBasket.length; i++) {
        this.countLogo += this.productsRenderInBasket[i].count;
      }
      return this.countLogo;
    },
  },
});
