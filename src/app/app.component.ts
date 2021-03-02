import { Component } from '@angular/core';
import { User } from './shared/user/user';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';

  constructor(private userApi: UserService){}

  ngOnInit(): void {
  }

  checkLogin(){
    return this.userApi.checkLogin().subscribe((data: User) => {
      this.userApi.loggedInUser = data;
    })
  }
}
