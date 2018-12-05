import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserStorage } from '../model/userStorage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptor implements HttpInterceptor {

  constructor() {}

  public intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (!request.url.includes('callback')) {
      request = this.addAuthorizationHeader(request);
    }

    if (request.url.includes('callback')) {
      request = this.addAccessControlHeader(request);
    }

    return next.handle(request);
  }

  private addAuthorizationHeader(request: HttpRequest<any>) {
    const userStorage: UserStorage = JSON.parse(localStorage.getItem(environment.accessToken));
    if (!_.isNil(userStorage)) {
      request = request.clone({
        headers: request.headers.set('Authorization', userStorage.accessToken.toString())
      });
    }
    return request;
  }

  private addAccessControlHeader(request: HttpRequest<any>) {
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*')
    });
    return request;
  }
}
