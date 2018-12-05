import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Data } from '../model/data';
import { Playlist } from '../model/spotify/spotifyPlaylist';
import { Track } from '../model/spotify/spotifyTrack';
import { distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GameScore } from '../model/gameScore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject(new Data());
  public data = this.dataSubject.asObservable();

  private tracksSubject = new Subject<Track[]>();
  public tracks = this.tracksSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {
    const data = this.dataSubject.value;
    data.gameScore = [];
    data.score = 0;
  }

  public getData() {
    return this.dataSubject.value;
  }

  public setDifficulty(difficulty: number) {
    const data = this.dataSubject.value;
    data.difficulty = difficulty;
    this.dataSubject.next(data);
  }

  public setPlaylist(playlist: Playlist) {
    const data = this.dataSubject.value;
    data.playlist = playlist;
    this.dataSubject.next(data);
  }

  public setGameScore(gameScore: GameScore[]) {
    const data = this.dataSubject.value;
    data.gameScore = gameScore;
    this.dataSubject.next(data);
  }

  public reset() {
    const data = this.dataSubject.value;
    data.gameScore = [];
    data.score = 0;
    data.difficulty = 0;
    data.playlist = new Playlist();
    
    
    this.tracksSubject.next(null);
    this.dataSubject.next(data);
  }

  public updateTracksByPlaylistID(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);

    this
      .fetchGetPlayListTrack(params)
      .subscribe(tracks => this.tracksSubject.next(tracks));
  }

  public fetchGetPlayListTrack(params: HttpParams) {
    return this.http.get<Track[]>(`${environment.serverUrl}/playlists/tracks`, { params });
  }

  public setPlaylistTracks(tracks: Track[]) {
    this.tracksSubject.next(tracks);
  }
}
