import { Component, OnInit, HostBinding } from '@angular/core';
import { UserStats } from '../../model/userStats';
import { LevelDifficulty } from '../../model/levelDifficulty';
import { ScoreService } from '../../services/score.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  public userStats: UserStats[];
  public levelDifficulty = LevelDifficulty;

  public cardVisible = true;
  public tableVisible = false;

  public stats = false;

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.getUserStats().subscribe(userStats => {
      
      if (_.isEmpty(userStats)) {
      } else {
        this.userStats = userStats;
        this.stats = true;
      }
    });
  }

  difficultyGradient(game: UserStats) {
    const difficultyPercent = game.difficulty * 100 / 15;
    return `linear-gradient(to right, #252830 ${difficultyPercent}% , transparent 0%)`;
  }

  scoreGradient(game: UserStats) {
    const gameDifficulty = 100 * game.difficulty;
    const scorePercent = 100 * (game.score / gameDifficulty);
    
    return `linear-gradient(to right, #252830 ${scorePercent}% , transparent 0%)`;
  }

  card() {
    this.cardVisible = true;
    this.tableVisible = false;
  }
  
  table() {
    this.cardVisible = false;
    this.tableVisible = true;
  }

  
}