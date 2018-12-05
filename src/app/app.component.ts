import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { CurrentUser } from './model/currentUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SpotyQuiz';
  public isAuth;
  public currentUser: CurrentUser;
  private temp;
  private timeInactivity: number;

  constructor(private loginService: LoginService, public router: Router) { }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    clearTimeout(this.temp);
    this.temp = setTimeout(this.logout, this.timeInactivity);
  }

  ngOnInit() {
    this.logout = this.logout.bind(this);
    this.loginService.currentUser.subscribe((currentUser: CurrentUser) => {
      this.currentUser = currentUser;
      this.isAuth = currentUser.isLogged();
    });
    // 600000
    this.timeInactivity = 300000;
    this.temp = setTimeout(this.logout, this.timeInactivity);

  }

  logout() {
    if (this.isAuth) {
      this.loginService.logOut();
      this.router.navigate(['/']);
    }
  }
}
