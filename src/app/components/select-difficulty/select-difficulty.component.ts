import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-select-difficulty',
  templateUrl: './select-difficulty.component.html',
  styleUrls: ['./select-difficulty.component.css']
})
export class SelectDifficultyComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }


  selectDifficulty(difficulty: number) {
    this.dataService.setDifficulty(difficulty);
    this.router.navigate(['/playlist']);
  }

}
