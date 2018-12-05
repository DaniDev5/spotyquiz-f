import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Playlist } from '../../model/spotify/spotifyPlaylist';
import { DataService } from '../../services/data.service';
import { PlaylistService } from '../../services/playlist.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-playlist',
  templateUrl: './select-playlist.component.html',
  styleUrls: ['./select-playlist.component.css']
})
export class SelectPlaylistComponent implements OnInit, OnDestroy {

  data: Data;

  public genericPlaylists: Playlist[];
  public userPlaylists: Playlist[];

  private playlistById: Playlist;
  public inputPlaylistId: string;
  private selectedPlaylist: Playlist;

  private tracksSubscription: Subscription;
  private dataSubscription: Subscription;
  private playlistSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.dataSubscription = this.dataService.data.subscribe(data => {
      this.data = data;
    });

    this.tracksSubscription = this.dataService.tracks.subscribe(tracks => {
      if (tracks.length >= (this.data.difficulty * 4) ) {
        this.goToPlay(this.selectedPlaylist);
      } else {
        alert('No se puede jugar con esta playlist en esta dificultad.');
      }
    });

    this.playlistService.fetchGetPlayLists().subscribe(genericPlaylists => {
      this.genericPlaylists = genericPlaylists;
    });

    this.playlistService.getUserPlaylists().subscribe(userPlaylists => {
      this.userPlaylists = userPlaylists;
    });
  }

  selectPlaylist(playlist: Playlist) {
    this.checkValidPlaylist(playlist);
  }

  searchPlaylist() {
    this.inputPlaylistId = this.validateInput(this.inputPlaylistId);
    this.playlistSubscription = this.playlistService.getSelectedPlaylist(this.inputPlaylistId)
    .subscribe(playlistById => {
        this.playlistById = playlistById;
        this.checkValidPlaylist(playlistById);
      },
      error => {
        alert('Error al validar la playlist.');
      }
    );
  }

  private validateInput(input: string) {
    if (_.isNil(input)) {
      return;
    }
    
    // https://open.spotify.com/user/spotify/playlist/37i9dQZF1DWV1PBrIG2weG?si=GTZNF6VyQwubA3Hf-_vQUg
    if (input.includes('https')) {
      const slices = input.split('/');
      const last = slices[slices.length - 1];
      const result = last.split('?')[0];
      return result;
    }

    // spotify:user:spotify:playlist:37i9dQZF1DWV1PBrIG2weG
    if (input.includes('spotify')) {
      const slices = input.split(':');
      const last = slices[slices.length - 1];
      const result = last.split('?')[0];
      return result;      
    } 
    return input;
  }

  private checkValidPlaylist(selectedPlaylist: Playlist) {
    this.selectedPlaylist = selectedPlaylist;
    this.dataService.updateTracksByPlaylistID(selectedPlaylist.id);
  }

  goToPlay(playlist: Playlist) {
    this.dataService.setPlaylist(playlist);
    this.router.navigate(['/play']);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    if (this.tracksSubscription) {
      this.tracksSubscription.unsubscribe();
    }
    if (this.playlistSubscription) {
      this.playlistSubscription.unsubscribe();
    }
  }

}
