import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  searchResults = new BehaviorSubject<Product[]>([])
  productUrl = "https://localhost:44381/Product/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getProducts(id: number): Observable<Product> {
    return this.http.get<Product>(this.productUrl + "GetProducts?CategoryId=" + id)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

  getFeaturedProducts(): Observable<Product> {
    return this.http.get<Product>(this.productUrl + "GetFeaturedProducts")
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(this.productUrl + "GetProduct?productId=" + id)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

  getSearchProducts(search: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl + "SearchProducts?Search=" + search)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

//   handleError(error) {
//     let errorMessage = '';
//     if(error.error instanceof ErrorEvent) {
//       // Get client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Get server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     window.alert(errorMessage);
//     return throwError(errorMessage);
//  }
}
