import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { AuthService } from './shared/auth/auth.service';
import { CacheMapService } from './shared/cache/cache-map.service';
import { HttpCacheInterceptor } from './shared/cache/http-cache.interceptor';
import { LoggingInterceptor } from './shared/log/logging.interceptor';
import { GlobalErrorHandlerService } from './shared/errorHandler/global-error-handler.service';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { DialogService } from './shared/deactivate/dialog.service';
import { MiniCartComponent } from './cart/mini-cart/mini-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    CartComponent,
    FooterComponent,
    ErrorHandlerComponent,
    MiniCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({maxOpened: 1, timeOut: 2000, closeButton: true}),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CacheMapService,
    DialogService,
    { provide: Cache, useClass: CacheMapService },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){
    console.log('App Module Loaded');
  }
}
