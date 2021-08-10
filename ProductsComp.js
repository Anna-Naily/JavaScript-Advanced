Vue.component("products", {
  data() {
    return {
      catalogUrl: "/catalogData.json",
      allProducts: [],
      filteredGoods: [],
    };
  },
  methods: {
    filterGoods() {
      let regExp = new RegExp(this.$root.$refs.filtered.searchLine, "i");
      this.filteredGoods = [];
      for (let i = 0; i < this.allProducts.length; i++) {
        if (this.allProducts[i].product_name.match(regExp)) {
          this.filteredGoods.push(this.allProducts[i]);
        }
      }
    },
    fetchGoods() {
      this.$parent
        .makeGETRequest(`${API_URL}` + this.catalogUrl)
        .then((value) => {
          this.allProducts = JSON.parse(value);
          this.filteredGoods = this.allProducts;
        })
        .catch((value) => {
          this.$root.$refs.error.setError(value);
        });
    },
  },
  mounted() {
    this.fetchGoods();
  },
  template: `<ul class="item-card-bar">
      <product v-for="item of filteredGoods" :key="item.id_product" :product="item"> </product>
     </ul>`,
});

Vue.component("product", {
  props: ["product"],
  template: `
  <li
                class="item-products card-icon"
              >
                <a class="card-link" href="single_page.html">
                  <div class="picture-card">
                    <img class="img-product" :src="product.image" alt="photo" />
                  </div>
                  <h4 class="name-product">{{product.product_name}}</h4>
                  <div class="text-rating-block">
                    <p class="price">$ {{product.price.toFixed(2)}}</p>
                    <div class="rating-product">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                </a>
                <button
                  @click="$root.$refs.cart.addProduct(product.id_product)"
                  data-id="product.id_product"
                  class="add-product"
                >
                  <img
                    class="cart"
                    src="image/white-cart.svg"
                    alt="white-cart"
                  />
                  Add to cart
                </button>
              </li>`,
});
