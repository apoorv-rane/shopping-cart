import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  constructor() {}

  private number: number = 2021;
  user = {
    name: "Apoorv",
  };

  updateValue() {
    this.user.name = "Rane";
  }

  ngOnInit(): void {}

  get counter() {
    return this.number;
  }

  set counter(value) {
    this.number = value;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
