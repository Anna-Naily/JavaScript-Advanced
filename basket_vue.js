"use strict";
const API_URL = "https://raw.githubusercontent.com/Anna-Naily/json/main";
const app = new Vue({
  el: "#app",
  data: {},
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
  },
});
