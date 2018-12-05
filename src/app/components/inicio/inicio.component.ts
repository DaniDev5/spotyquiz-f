import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUser } from '../../model/currentUser';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  public currentUser: CurrentUser;
  public isAuth: boolean;
  public errors: string[];
  
  constructor(private loginService: LoginService, private http: HttpClient) { }
  
  ngOnInit() {
    this.loginService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
      this.isAuth = this.currentUser.isLogged();
    });
  }
  
  logout() {
    this.loginService.logOut();
  }
}
