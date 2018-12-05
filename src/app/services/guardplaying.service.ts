import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GuardplayingService implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const data = this.dataService.getData();

    if (data.difficulty == null) {
      if (data.playlist == null) {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }

}

