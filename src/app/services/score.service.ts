import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { ScoreBack } from '../model/scoreBack';
import { UserStats } from '../model/userStats';


@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  public saveScoreBack(scoreBack: ScoreBack) {
    return this.http.post(`${environment.serverUrl}/games`, scoreBack);
  }

  public getUserStats() {
    return this.http.get<UserStats[]>(`${environment.serverUrl}/user/stats`);
  }

  public getGamesPlayedByQuantity(quantity: string) {
    return this.http.get<UserStats[]>(`${environment.serverUrl}/games/history/${quantity}`);
  }

  public getPlaylistsByName(name: string) {
    let params = new HttpParams();
    params = params.append('word', name);

    return this.http.get<UserStats[]>(`${environment.serverUrl}/games/find`, { params });
  }
}
