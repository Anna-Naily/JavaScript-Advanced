Vue.component("cart", {
  data() {
    return {
      isVisibleCart: false,
      basket: [],
      productsRenderInBasket: [],
    };
  },
  methods: {
    //загрузка товаров в корзину при обновлении страницы
    fetchGoods() {
      this.$parent.getJson("/api/cart").then((data) => {
        this.basket = data.contents;
        this.productsRenderInBasket = this.basket;
      });
    },
    //добавление товара в корзину.
    addProduct(id) {
      //добавление файла (create) и change файла с инкриментом +1
      this.productsRenderInBasket = [];
      let find = this.basket.find((el) => el.id_product === id); //если в массиве товар нашелся, то он помещается в find, иначе undefined
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {
          count: 1,
        });
        find.count++;
      } else {
        let findInFilteredGoods = this.$root.$refs.products.filteredGoods.find(
          (el) => el.id_product === id
        );
        findInFilteredGoods.count = 1;
        this.$parent.postJson("/api/cart", findInFilteredGoods).then(() => {
          this.basket.push(findInFilteredGoods);
          console.log("ok");
        });
      }
      this.productsRenderInBasket = this.basket;
    },
    //удаление товара по нажатию на кнопку в корзине (change элемента с инкриментом -1 и выпиливание элемента из списка)
    removeProduct(item) {
      this.productsRenderInBasket = [];
      if (item.count > 1) {
        item.count--;
        this.$parent.putJson(`/api/cart/${item.id_product}`, {
          count: -1,
        });
      } else {
        this.basket.splice(this.basket.indexOf(item), 1);
        this.$parent.deleteJson(`/api/cart/${item.id_product}`, {
          count: find.count,
        });
      }
      this.productsRenderInBasket = this.basket;
    },
  },
  mounted() {
    //загрузка товаров в корзине, при старте страницы
    this.fetchGoods();
  },
  computed: {
    //Расчет общей стоимости корзины
    recalculationTotalSum() {
      let totalSum = 0;
      for (let i = 0; i < this.productsRenderInBasket.length; i++) {
        totalSum +=
          this.productsRenderInBasket[i].count *
          this.productsRenderInBasket[i].price;
      }
      return totalSum;
    },
    //Подсчет кол-ва товаров, отображающихся на логотипе корзины
    calculationCountLogo() {
      let countLogo = 0;
      for (let i = 0; i < this.productsRenderInBasket.length; i++) {
        countLogo += this.productsRenderInBasket[i].count;
      }
      return countLogo;
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
      @click="$root.$refs.cart.removeProduct(cartItem)"
      data-idSpan="cartItem.id_product"
      class="delete-cart"
    >
      <i class="fas fa-times-circle"></i>
    </span>
  </div>
</div>
    `,
});
