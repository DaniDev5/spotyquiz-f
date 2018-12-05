import { Track } from '../model/spotify/spotifyTrack';
import { Injectable } from '@angular/core';
import { Playlist } from '../model/spotify/spotifyPlaylist';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  public fetchGetPlayLists() {
    return this.http.get<Playlist[]>(`${environment.serverUrl}/playlists`);
  }

  public getSelectedPlaylist(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Playlist>(`${environment.serverUrl}/playlists/infoResponse`, { params });
  }

  public getUserPlaylists() {
    return this.http.get<Playlist[]>(`${environment.serverUrl}/playlists/me`);
  }
}
