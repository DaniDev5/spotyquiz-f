import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }

 }
