import {APP_INITIALIZER} from '@angular/core';
import { LoginService } from './login.service';

export function initAuth(loginService: LoginService): Function {
  return (): Promise<any> => loginService.initCurrentUserFromStorage().toPromise().catch(() => {});
}

export const AuthInitializer = {
  provide: APP_INITIALIZER,
  useFactory: initAuth,
  deps: [LoginService],
  multi: true
};
