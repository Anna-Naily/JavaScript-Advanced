const cartElement = {
  props: ["cartElement", "cartCount"],
  template: `<div class="ElementOnCartPage product-details-element">
      <div class="shopping-card-box">
        <span class="link-shopping-card"
          ><img
            class="shopping-card"
            :src="cartElement.image"
            alt="photo"
        /></span>
        <div class="shopping-description">
          <h2 class="heading-shopping">{{cartElement.product_name}}</h2>
          <div class="rating-shopping-block">
            <i class="fas fa-star"></i><i class="fas fa-star"></i
            ><i class="fas fa-star"></i><i class="fas fa-star"></i
            ><i class="fas fa-star-half-alt"></i>
          </div>
          <p class="text-shopping">
            <span class="span-txt-shopping">Color:</span> Red
          </p>
          <p class="text-shopping">
            <span class="span-txt-shopping">Size:</span> Xll
          </p>
        </div>
      </div>
      <div class="shopping-info">
        <p class="text-shopping-info">$ {{cartElement.price}}</p>
        <span class="shopping-form">
          <p
            class="shopping-input">{{cartCount}}
            </p>
        </span>
        <p class="text-shopping-info shopping-info_margin">FREE</p>
        <p class="text-shopping-info shopping-info_margin">$ {{cartElement.price*cartCount}}</p>
        <span @click="$root.$refs.cart.removeProduct(cartElement)" class="delete-product"
          ><i class="fas fa-times-circle"></i
        ></span>
      </div>
  </div>`,
};

const cartpage = {
  components: { cartElement },
  data() {
    return {};
  },
  methods: {},
  template: `<div>
  <div v-if="$root.$refs.cart.productsRenderInBasket!=0">
  <cart-element v-for="element of $root.$refs.cart.productsRenderInBasket" :key="element.id_product" :cartElement="element" :cartCount="element.count"></cart-element>
  <div class="button-block">
  <a href="#" class="shopping-button">give feedback</a>
  <a href="index.html" class="shopping-button">cONTINUE sHOPPING</a>
</div>
</div>
<div v-else><h2 class="emptyCart">Корзина пуста</h2>
</div>
<div class="container bottom-shopping-block">
<form action="#" class="shipping-address" method="POST">
<h1 class="heading-shipping-address">Shipping Adress</h1>
<select class="select-address" id="address">
  <option value="Bangladesh">Bangladesh</option>
  <option value="Russia">Russia</option>
  <option value="USA">USA</option>
  <option value="Sweden">Sweden</option>
</select>
<input class="state" type="text" placeholder="State" />
<input class="state" type="text" placeholder="Postcode / Zip" />
<button class="get-a-quote" type="submit">get a quote</button>
</form>
<form action="#" class="shipping-address" method="POST">
<h1 class="heading-shipping-address">coupon discount</h1>
<p class="text-shipping-address">
  Enter your coupon code if you have one
</p>
<input class="state" type="text" placeholder="State" />
<button class="coupon" type="submit">Apply coupon</button>
</form>
<div class="proceed-to-checkout">
<div class="text-check-block">

</div>
<a href="checkout.html" class="link-proceed">proceed to checkout</a>
</div>
</div>
</div>


`,
};

export default cartpage;
