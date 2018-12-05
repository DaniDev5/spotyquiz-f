import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreBack } from '../../model/scoreBack';
import { Data } from '../../model/data';
import { DataService } from '../../services/data.service';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnDestroy {

  public data: Data;
  private scoreBack: ScoreBack;
  private dataSubcription;

  constructor(
    private dataService: DataService,
    private scoreService: ScoreService,
    private router: Router) { }

  ngOnInit() {
    this.dataSubcription = this.dataService.data.subscribe(
      data => {
        if (data.playlist.id == null) {
          this.router.navigate(['/']);
        }
        if (data.playlist.id != null) {
          this.data = data;
          this.convertScore();
          this.saveScoreInBack(this.scoreBack);
        }
      }
    );
  }

  convertScore() {
    this.scoreBack = new ScoreBack();
    this.scoreBack.difficulty = this.data.difficulty;
    this.scoreBack.playlistPlayed = this.data.playlist.id;
    this.scoreBack.playlistName = this.data.playlist.name;
    this.scoreBack.score = this.data.score;
  }
  /**
   * Envía el resultado de la partida en el back
   * @param score resultado de la partida
   */
  saveScoreInBack(score) {
    this.scoreService.saveScoreBack(score).subscribe(
      // Error ?¿
    );
  }

  ngOnDestroy(): void {
    this.scoreBack = new ScoreBack();
    this.dataSubcription.unsubscribe();
    this.dataService.reset();
  }



}
