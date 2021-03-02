import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';
import { CartService } from '../shared/cart/cart.service';
import { CategoryService } from '../shared/category/category.service';
import { ProductService } from '../shared/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private categoryApi: CategoryService,
    private productApi: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cartService: CartService) {}

  categoryList: any = []
  productList: any = []
  loggedIn: any

  ngOnInit(): void {
    this.authService.getLoggedIn.subscribe(x =>{
      this.loggedIn = x
    })
    this.loadCategories()
    this.searchForm
    this.searchProducts()
  }

  loadCategories() {
    return this.categoryApi.getCategories().subscribe((data: {}) => {
      this.categoryList = data
    })
  }

  loadProducts(id: number) {
    return this.productApi.getProducts(id).subscribe((data: {}) => {
      this.productList = data
    })
  }

  categoryClicked(categoryId){
    // this.categoryApi.categoryIdObserved(categoryId)
    this.categoryApi.categoryId.next(categoryId)
  }

  logout(){
    localStorage.clear();
    this.cartService.cartItems.next([])
    this.authService.getLoggedIn.next(false)
    this.toastr.clear()
    this.toastr.success('','Logout Successful')
    this.ngOnInit()
    this.router.navigate([''])
  }

  search = new FormControl(); 
  searchForm: FormGroup = this.formBuilder.group({
    search: this.search
    }
  );

  searchProducts(){
    this.search.valueChanges.pipe(
      debounceTime(500),
      switchMap(search => {
        return this.productApi.getSearchProducts(search)
      })
    ).subscribe(data => {
      this.productApi.searchResults.next(data)
      if(data == null){
        this.router.navigate([''])
      }
      else{
        this.router.navigate(['./product/search/', this.search.value])
      }
    })
  }
}
