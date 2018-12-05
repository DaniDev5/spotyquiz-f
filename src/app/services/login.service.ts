import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, BehaviorSubject, Observable } from 'rxjs';
import {distinctUntilChanged, mergeMap, map} from 'rxjs/operators';
import { CurrentUser } from '../model/currentUser';
import { UserStorage } from '../model/userStorage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject = new BehaviorSubject<CurrentUser>(new CurrentUser());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) { }

  public login(code: string): Observable<void> {
    return this.fetchLogin(code).pipe(mergeMap((userStorageResponse: string) => {
      const userStorage = new UserStorage();
      userStorage.accessToken = userStorageResponse;
      this.setUserStorage(userStorage);

      return this.initCurrentUserFromStorage();
    }));
  }

  public initCurrentUserFromStorage(): Observable<void> {
    if (!_.isNil(this.getUserToken())) {
      return this.fetchCurrentUser().pipe(
        map((response: CurrentUser) => {
          const user = this.currentUserSubject.value;

          user.profileImg = response.profileImg;
          user.email = response.email;
          user.spotifyId = response.spotifyId;
          user.displayName = response.displayName;
          user.userStorage = this.getUserStorage();

          this.currentUserSubject.next(user);
        })
      );
    }
    return of(null);
  }

  private fetchLogin(code: string): Observable<string> {
    let params = new HttpParams();
    params = params.append('code', code);

    return this.http.get(`${environment.serverUrl}/callback`, { params, responseType: 'text'});
  }

  private fetchCurrentUser() {
    return this.http.get<CurrentUser>(`${environment.serverUrl}/user`);
  }

  private setUserStorage(userStorage: UserStorage): void {
    localStorage.setItem(environment.accessToken, JSON.stringify(userStorage));
  }

  public getUserToken() {
    const userStorage: UserStorage = this.getUserStorage();
    return _.isNil(userStorage) ? null : userStorage.accessToken;
  }

  private getUserStorage(): UserStorage {
    const storageValue = localStorage.getItem(environment.accessToken);
    return _.isNil(storageValue) ? null : JSON.parse(storageValue);
  }


  public logOut() {
    this.currentUserSubject.next(new CurrentUser());
    this.deleteStorage();
  }

  private deleteStorage() {
    localStorage.removeItem('Authorization');
  }

  public getCurrentUser(): CurrentUser {
    return this.currentUserSubject.value;
  }
}
