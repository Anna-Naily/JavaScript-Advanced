Vue.component("cart", {
  data() {
    return {
      isVisibleCart: false,
      basket: [],
      totalSum: 0,
      productsRenderInBasket: [],
      countLogo: 0,
    };
  },
  methods: {
    addProduct(id) {
      //отрисовка массива продуктов в корзине (создан доп. массив, чтобы обновлялась цифра кол-ва одного продукта в коризне при нескольких нажатиях на кнопку добавления)
      this.productsRenderInBasket = [];
      for (let i = 0; i < this.$root.$refs.products.filteredGoods.length; i++) {
        if (
          this.$root.$refs.products.filteredGoods[i].id_product == id &&
          !this.checkAndIncreaseInBasket(id)
        ) {
          let productInCart = this.$root.$refs.products.filteredGoods[i];
          productInCart.count = 1;
          this.basket.push(productInCart);
        }
      }
      this.productsRenderInBasket = this.basket;
    },
    //Удаление товара из корзины
    removeProduct(id) {
      this.productsRenderInBasket = [];
      for (let i = 0; i < this.$root.$refs.products.filteredGoods.length; i++) {
        if (this.$root.$refs.products.filteredGoods[i].id_product == id) {
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
  template: `<div>
  <span @click="isVisibleCart=!isVisibleCart" class="cart-details">
                <img class="basket" src="image/logo_cart.svg" alt="cart" />
                <span class="count-buy" v-if="basket.length>0"
                  >{{calculationCountLogo}}</span
                >
              </span>
              <div class="cart-block" v-show="isVisibleCart">
              <div class="block-for-products">
                <cart-item v-for="item of productsRenderInBasket" :key="item.id_product" :cartItem="item" :cartCount="item.count"></cart-item>
                </div>
                <div class="price-cart">
                  <h2 class="total" v-if="basket.length!=0">
                    total
                    <span class="totalPrice"
                      >$ {{recalculationTotalSum.toFixed(2)}}</span
                    >
                  </h2>
                  <h2 class="total" v-else>Товаров нет</h2>
                </div>
                <div class="button-cart">
                  <a href="checkout.html" class="link-checkout">CHECKOUT </a>
                  <a href="shopping_cart.html" class="link-checkout go-to-cart"
                    >GO TO CART
                  </a>
                </div>
              </div></div>`,
});
Vue.component("cart-item", {
  props: ["cartItem", "cartCount"],
  template: `<div class="cart-element">
    <img
      class="img-cart"
      width="100px"
      height="100px"
      :src="cartItem.image"
      alt="photo"
    />
    <div class="cart-info">
      <h2 class="heading-cart">{{cartItem.product_name}}</h2>
      <div class="rating-block">
        <i class="fas fa-star"></i><i class="fas fa-star"></i
        ><i class="fas fa-star"></i><i class="fas fa-star"></i
        ><i class="fas fa-star-half-alt"></i>
      </div>
      <p class="count-cart">{{cartCount}}
        x {{cartItem.price}}
      </p>
    </div>
    <span
      @click="$root.$refs.cart.removeProduct(cartItem.id_product)"
      data-idSpan="cartItem.id_product"
      class="delete-cart"
    >
      <i class="fas fa-times-circle"></i>
    </span>
  </div>
</div>
    `,
});
