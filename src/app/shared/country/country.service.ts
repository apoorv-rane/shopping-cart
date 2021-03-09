import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { City } from './city';
import { Country } from './country';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  countryUrl = "https://localhost:44381/Country/"
  stateUrl = "https://localhost:44381/State/"
  cityUrl = "https://localhost:44381/City/"

  getCountries(): Observable<Country> {
    return this.http.get<Country>(this.countryUrl + 'GetCountries')
      .pipe(
        retry(1)
    )
  }

  getStates(countryId): Observable<State> {
    return this.http.get<State>(this.stateUrl + 'GetStates?countryId=' + countryId)
      .pipe(
        retry(1)
    )
  }

  getCities(stateId): Observable<City> {
    return this.http.get<City>(this.cityUrl + 'GetCities?stateId=' + stateId)
      .pipe(
        retry(1)
    )
  }
}
