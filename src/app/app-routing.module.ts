import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { SelectDifficultyComponent } from './components/select-difficulty/select-difficulty.component';
import { PlayComponent } from './components/play/play.component';
import { SelectPlaylistComponent } from './components/select-playlist/select-playlist.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './components/login/login.component';
import { ScoreComponent } from './components/score/score.component';

import { GuardService } from './services/guard.service';
import { GuardplayingService } from './services/guardplaying.service';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'callback', component: LoginComponent },
  { path: 'score', component: ScoreComponent, canActivate: [GuardService, GuardplayingService] },
  { path: 'difficulty', component: SelectDifficultyComponent, canActivate: [GuardService] },
  { path: 'playlist', component: SelectPlaylistComponent, canActivate: [GuardService, GuardplayingService] },
  { path: 'play', component: PlayComponent, canActivate: [GuardService, GuardplayingService] },
  { path: 'user/stats', component: UserStatsComponent, canActivate: [GuardService] },
  { path: 'stats', component: StatsComponent, canActivate: [GuardService] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
