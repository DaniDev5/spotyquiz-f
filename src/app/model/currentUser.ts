import * as _ from 'lodash';
import { UserStorage } from './userStorage';

export class CurrentUser {

  public userStorage: UserStorage;
  public spotifyId: string;
  public email?: string;
  public profileImg?: string;
  public displayName?: string;

  public isLogged() {
    return !_.isNil(this.userStorage);
  }
}
