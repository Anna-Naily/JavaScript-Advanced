"use strict";
import cart from "./CartComp";
import cartpage from "./CartPageComp";
import error from "./ErrorComp";
import filtered from "./FilterComp";
import products from "./ProductsComp";
import rendered from "./RenderSingleProductComp";

const app = {
  el: "#app",
  components: {
    cart,
    cartpage,
    error,
    filtered,
    products,
    rendered,
  },
  data: {
    singleId: 0,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((err) => {
          this.$refs.error.setError(err);
        });
    },
    postJson(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((err) => {
          this.$refs.error.setError(err);
        });
    },
    putJson(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((err) => {
          this.$refs.error.setError(err);
        });
    },
    deleteJson(url, data) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((err) => {
          this.$refs.error.setError(err);
        });
    },
  },
};
export { app };
