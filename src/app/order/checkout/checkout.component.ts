import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { City } from 'src/app/shared/country/city';
import { Country } from 'src/app/shared/country/country';
import { CountryService } from 'src/app/shared/country/country.service';
import { State } from 'src/app/shared/country/state';
import { CartService } from '../../shared/cart/cart.service';
import { Item } from '../../shared/cart/item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
    private countryService: CountryService,
    private formBuilder: FormBuilder) { }
  
  cartItems: Item[] = []
  total: number = 0
  count: number = 0
  countries: Country[]
  states: State[]
  cities: City[]
  mode: boolean = false
  
  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res => {
      this.cartItems = res
      if(this.cartItems.length == 0){
        this.toastr.clear()
        this.toastr.info('Add some items to cart in order to checkout', 'Empty Cart')
        this.router.navigate([''])
      }
      this.total = 0
      this.count = 0
      this.cartItems.forEach(a => this.total += a.Price)
      this.cartItems.forEach(a => this.count += a.Quantity)
    })
    this.checkoutForm
    this.checkoutForm.patchValue({
      CreatedBy: localStorage.getItem('userId')
    })
    this.getCountries()
    this.getStates()
    this.getCities()
    this.getPaymentMode()
  }

  checkoutForm = this.formBuilder.group({
    Address: [''],
    Country: [''],
    State: [''],
    City: [''],
    PostalCode: [''],
    PaymentMode: ['Cash'],
    TotalPayment: [''],
    Comment: [''],
    CreatedBy: ['']
  })

  getCountries(){
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data
    })
  }

  getStates(){
    this.checkoutForm.controls['Country'].valueChanges.pipe(
      switchMap(countryId => {
        return this.countryService.getStates(countryId)
      })
    ).subscribe((data: any) => {
      this.states = data
    })
  }

  getCities(){
    this.checkoutForm.controls['State'].valueChanges.pipe(
      switchMap(stateId => {
        return this.countryService.getCities(stateId)
      })
    ).subscribe((data: any) => {
      this.cities = data
    })
  }

  getPaymentMode(){
    this.checkoutForm.controls['PaymentMode'].valueChanges.subscribe((data: any) => {
      this.mode = !this.mode
      if(data == 'Card'){
        this.checkoutForm.addControl('CardNumber',
          this.formBuilder.control(''));
        this.checkoutForm.addControl('ExpiryMonth',
          this.formBuilder.control(''));
        this.checkoutForm.addControl('ExpiryYear',
          this.formBuilder.control(''));
        this.checkoutForm.addControl('CVV',
          this.formBuilder.control(''));
      }
      else{
        this.checkoutForm.removeControl('CardNumber')
        this.checkoutForm.removeControl('ExpiryMonth')
        this.checkoutForm.removeControl('ExpiryYear')
        this.checkoutForm.removeControl('CVV')
      }
    })
  }

  placeOrder(){
    console.log(this.checkoutForm.value)
  }

}
