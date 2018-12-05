import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/components/common/menuitem';
import { CurrentUser } from '../../model/currentUser';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  public isAuth;
  public currentUser: CurrentUser;
  isAuthMenuItems: MenuItem[];
  isNotAuhtMenuItems: MenuItem[];
  public isPlaying: boolean;

  constructor(private loginService: LoginService, public router: Router) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe((currentUser: CurrentUser) => {
      this.currentUser = currentUser;
      this.isAuth = currentUser.isLogged();
    });
    if (this.router.url !== '/play'  && this.router.url !== '/score') {
      this.isPlaying = true ;
    } else {
      this.isPlaying = false;
    }
  }

  logout() {
    this.loginService.logOut();
    this.router.navigate(['/']);
  }
}
