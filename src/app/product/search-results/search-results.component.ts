import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private productApi: ProductService) { }

  searchedProducts: any;
  
  ngOnInit(): void {
    this.productApi.searchResults.subscribe(data =>{
      this.searchedProducts = data
    })
  }

}
