import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Category } from './category';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  // categoryId = new Subject<number>();
  // categoryId$ = this.categoryId.asObservable();
  // categoryIdObserved(id){
  //   this.categoryId.next(id)
  // }
  categoryId = new BehaviorSubject<number>(0)
  categoryUrl = "https://localhost:44381/Category/"

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl + "GetCategories")
      .pipe(
        retry(1)
        // catchError(this.handleError)
      )
  }

  getCategory(id): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl + "GetCategory?categoryId=" + id)
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
