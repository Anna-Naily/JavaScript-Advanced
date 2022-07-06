const product = {
  props: ["product"],
  template: `
  <li
                class="item-products card-icon"
              >
              
                <span @click="$root.$refs.products.addPage(product.id_product)" 
                class="card-link">
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
                </span>
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
};
import filtered from "./FilterComp";
const products = {
  components: { product, filtered },
  data() {
    return {
      catalogUrl: "/catalogData.json",
      allProducts: [],
      filteredGoods: [],
    };
  },
  methods: {
    //метод фильтрации товаров
    filterGoods() {
      let regExp = new RegExp(this.$root.$refs.filtered.searchLine, "i");
      this.filteredGoods = [];
      for (let i = 0; i < this.allProducts.length; i++) {
        if (this.allProducts[i].product_name.match(regExp)) {
          this.filteredGoods.push(this.allProducts[i]);
        }
      }
    },
    //метод загрузки продуктов в каталог
    fetchGoods() {
      this.$parent.getJson("/api/products").then((data) => {
        this.allProducts = data;
        this.filteredGoods = this.allProducts;
      });
    },

    //добавление ай ди перехода на страницу.
    addPage(id) {
      let objectPage = { id_product: id };
      this.$parent.putJson("/api/open", objectPage).then(() => {
        document.location.href = "single_page.html";
      });
    },
  },
  mounted() {
    this.fetchGoods();
  },
  template: `<ul class="item-card-bar">
      <product v-for="item of filteredGoods" :key="item.id_product" :product="item"> </product>
     </ul>`,
};
// href="single_page.html"

export default products;
