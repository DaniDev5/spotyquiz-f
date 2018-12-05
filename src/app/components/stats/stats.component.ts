import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelDifficulty } from '../../model/levelDifficulty';
import { UserStats } from '../../model/userStats';
import { Playlist } from '../../model/spotify/spotifyPlaylist';
import { DataService } from '../../services/data.service';
import { ScoreService } from './../../services/score.service';
import { PlaylistService } from '../../services/playlist.service';
import * as _ from 'lodash';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public gamesPlayed: UserStats[];
  public selectedGames: UserStats[];
  public levelDifficulty = LevelDifficulty;

  public playlist: Playlist;

  public games = false;

  private searchSubject: Subject<string> = new Subject();

  constructor(
    private scoreService: ScoreService,
    private dataService: DataService,
    private playlistService: PlaylistService,
    private router: Router
  ) { }

  ngOnInit() {
    this.scoreService.getGamesPlayedByQuantity('10').subscribe(
      gamesPlayed => {
        if (!_.isEmpty(gamesPlayed)) {
          this.gamesPlayed = gamesPlayed;
          this.selectedGames = gamesPlayed;
          this.games = true;
        }
      }
    );

    // https://stackoverflow.com/questions/42761163/angular-2-debouncing-a-keyup-event
    this.searchSubject
      .pipe(
        debounceTime(500),
        mergeMap(name => this.scoreService.getPlaylistsByName(name))
      )
      .subscribe(games => { this.selectedGames = games; });
  }

  play(difficulty: number, playlistPlayed: string) {
    this.dataService.setDifficulty(difficulty);
    this.playlistService.getSelectedPlaylist(playlistPlayed).subscribe(playlist => {
      this.dataService.setPlaylist(playlist);
      this.router.navigate(['/play']);
    });
  }


  searchPlaylists(name) {
    this.searchSubject.next(name);
  }
}