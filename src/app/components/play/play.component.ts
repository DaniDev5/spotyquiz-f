import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Track } from '../../model/spotify/spotifyTrack';
import { Data } from '../../model/data';
import { GameScore } from '../../model/gameScore';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {
  public data: Data;
  public tracks: Track[];
  public currentTracks: Track[];
  public correctTrack: Track;
  private gameS: GameScore;
  public counterTrack = 0;
  private dataSubscription: Subscription;
  private tracksSubscription: Subscription;
  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataSubscription = this.dataService.data.subscribe(data => {
      if (data.difficulty === 0) {
        alert('Selecciona la dificultad');
        this.router.navigate(['/difficulty']);
      }
      this.data = data;
    });
    this.dataService.updateTracksByPlaylistID(this.data.playlist.id);
    this.tracksSubscription = this.dataService.tracks.subscribe(tracks => {

      if (tracks === null) {
        alert('Selecciona una playlist');
        this.router.navigate(['/playlist']);
      }
      this.tracks = tracks.slice(0);
      this.tracks = this.tracks.sort(() => Math.random() - 0.5);
      this.loadLevelTracks();
    });
  }

  loadLevelTracks() {
    this.extractCurrentTracks();
    this.selectCorrectTracks();
    this.counterTrack++;
  }

  extractCurrentTracks() {
    this.currentTracks = [];
    for (let i = 0; i < 4; i++) {
      this.currentTracks.push(this.tracks.pop());
    }
  }

  selectCorrectTracks() {
    const r = Math.round(Math.random() * 3);
    this.correctTrack = this.currentTracks[r];
  }

  selectTrack(track: Track) {
    let score = 0;
    this.gameS = new GameScore();
    if (track.id === this.correctTrack.id) {
      score = 1;
    }
    this.saveScore(score);
    this.nextQuest();
  }

  saveScore(score) {
    this.gameS.tracks = this.currentTracks.slice(0);
    this.gameS.track = this.correctTrack;
    this.gameS.score = score;
    this.data.gameScore.push(this.gameS);
    this.data.score = this.data.score + score * 100;
  }

  nextQuest() {
    if (this.data.gameScore.length >= this.data.difficulty) {
      this.router.navigate(['/score']);
    } else {
      this.dataService.setPlaylistTracks(this.tracks);
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.tracksSubscription.unsubscribe();
    if (this.gameNotFinished()) {
      this.dataService.reset();
    }
  }

  private gameNotFinished() {
    return this.data.gameScore.length < this.data.difficulty;
  }
}
