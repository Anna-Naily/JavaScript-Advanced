import cart from "./CartComp";
const rendered = {
  components: {
    cart,
  },
  data() {
    return {
      id: 3,
      productsArr: [],
    };
  },
  methods: {
    fetchGoods() {
      this.$parent.getJson("/api/products").then((data) => {
        this.productsArr = data;
        this.fetchGetId();
      });
    },
    //смотрим с сервера номер открываемой страницы
    fetchGetId() {
      this.$parent.getJson("/api/open").then((data) => {
        if (data.contents.length > 0) {
          this.id = data.contents[data.contents.length - 1].id_product;
        }
      });
    },
    //добавление товара в корзину.
    addProduct(id) {
      this.$root.$refs.cart.productsRenderInBasket = [];
      let find = this.$root.$refs.cart.basket.find(
        (el) => el.id_product === id
      );
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {
          count: 1,
        });
        find.count++;
      } else {
        let findInFilteredGoods = this.productsArr.find(
          (el) => el.id_product === id
        );
        findInFilteredGoods.count = 1;
        this.$parent.postJson("/api/cart", findInFilteredGoods).then(() => {
          this.$root.$refs.cart.basket.push(findInFilteredGoods);
        });
      }
      this.$root.$refs.cart.productsRenderInBasket =
        this.$root.$refs.cart.basket.basket;
    },
  },
  mounted() {
    this.fetchGoods();
  },

  template: `
  <div>
  <div class="slider-background">
  <div class="slider-block">
    <img
      class="slider-block-img"
      width="500px"
      height="500px"
      :src="productsArr[id].image"
      alt="photo"
    />
  </div>
</div>
<div class="container product-description">
  <h2 class="heading-collection">NEW COLLECTION</h2>
  <div class="slider-single">
    <img src="image/line-single.png" alt="logo" />
  </div>
  <h1 class="heading-product">{{productsArr[id].product_name}}</h1>
  <p class="description">
    Compellingly actualize fully researched processes before proactive
    outsourcing. Progressively syndicate collaborative architectures
    before cutting-edge services. Completely visualize parallel core
    competencies rather than exceptional portals.
  </p>
  <div class="product-center-block">
    <p class="item-description">
      <span 
       class="span-item"
      >MATERIAL: </span>COTTON
    </p>
    <p class="item-description">
      <span class="span-item">DESIGNER: </span>BINBURHAN
    </p>
  </div>
  <p class="product-item-price">$ {{productsArr[id].price.toFixed(2)}}</p>
  <span @click="$root.$refs.cart.addProduct(id)" class="button-add"
    ><img
      class="logo-add-to-cart"
      src="image/pink-logo-cart.svg"
      alt="logo"
    />Add to Cart</span
  >
</div></div>`,
};
export default rendered;
