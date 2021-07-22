"use strict";
class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.topping = false;
    this.mayonnaise = false;
    switch (size) {
      case "big":
        this.mainPrice = 100;
        this.mainCalories = 40;
        break;
      case "small":
        this.mainPrice = 50;
        this.mainCalories = 20;
        break;
    }
    switch (stuffing) {
      case "cheese":
        this.subPrice = 10;
        this.subCalories = 20;
        break;
      case "salad":
        this.subPrice = 20;
        this.subCalories = 5;
        break;
      case "potato":
        this.subPrice = 15;
        this.subCalories = 10;
        break;
    }
    this.price = this.mainPrice + this.subPrice;
    this.calories = this.mainCalories + this.subCalories;
  }
  addTopping() {
    if (!this.topping) {
      this.price += 15;
      this.topping = true;
    }
  }
  addMayonnaise() {
    if (!this.mayonnaise) {
      this.price += 20;
      this.calories += 5;
      this.mayonnaise = true;
    }
  }
  removeTopping() {
    if (this.topping) {
      this.price -= 15;
      this.topping = false;
    }
  }
  removeMayonnaise() {
    if (this.mayonnaise) {
      this.price -= 20;
      this.calories -= 5;
      this.mayonnaise = false;
    }
  }
  getToppings() {
    if (this.topping && this.mayonnaise) {
      console.log("Добавлены приправа и майонез");
    } else if (this.topping && !this.mayonnaise) {
      console.log("Добавлена приправа");
    } else if (!this.topping && this.mayonnaise) {
      console.log("Добавлен майонез");
    } else {
      console.log("Добавок нет");
    }
  }
  getSize() {
    console.log(this.size);
  }
  getStuffing() {
    console.log(this.stuffing);
  }
  calculatePrice() {
    console.log(this.price);
  }
  calculateCalories() {
    console.log(this.calories);
  }
}
let hamburger = new Hamburger("big", "cheese");
hamburger.addTopping();
hamburger.addMayonnaise();
hamburger.calculatePrice();
hamburger.calculateCalories();
hamburger.getSize();
hamburger.getStuffing();
hamburger.getToppings();
