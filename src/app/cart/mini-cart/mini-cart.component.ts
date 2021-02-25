import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css']
})
export class MiniCartComponent implements OnInit, OnChanges, DoCheck {

  constructor() { }
  private myNumber: number

  @Input() newUser

  @Input()
  set myNewNumber(number: number){
    this.myNumber = number
  }

  get myNewNumber(){
    return this.myNumber
  }

  ngOnChanges(changes: SimpleChanges){
    const myNumberChange: SimpleChange = changes.myNewNumber
    console.log("ngOnChanges")
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }
  
  ngDoCheck(){
    console.log("ngDoCheck")
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit")
  }

  ngAfterContentChecked(){
    console.log("ngAfterContentChecked")
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit")
  }

  ngAfterViewChecked(){
    console.log("ngAfterViewChecked")
  }

  ngOnDestroy(){
    console.log("ngOnDestroy")
  }
}
