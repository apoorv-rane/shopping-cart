import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from './cache-map.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cache: CacheMapService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRequestCachable(request)) {
      return next.handle(request)
    }
    const cachedResponse = this.cache.get(request);
    if (cachedResponse !== null) {
      return of(cachedResponse)
    }
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.put(request, event)
        }
      })
    )
  }

  private isRequestCachable(request: HttpRequest<any>) {
    return request.method === 'GET'
  }
}
