import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SelectDifficultyComponent } from './components/select-difficulty/select-difficulty.component';
import { PlayComponent } from './components/play/play.component';
import { SelectPlaylistComponent } from './components/select-playlist/select-playlist.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { StatsComponent } from './components/stats/stats.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { LoginComponent } from './components/login/login.component';
import { ScoreComponent } from './components/score/score.component';
import { FooterComponent } from './components/footer/footer.component';

// SERVICIOS //
import { LoginService } from './services/login.service';
import { DataService } from './services/data.service';
import { PlaylistService } from './services/playlist.service';
import { AuthInitializer } from './services/auth.initialize';

// INTERCEPTORS //
import { LoginInterceptor } from './interceptors/login.interceptor';

// PRIMENG //
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenubarComponent,
    LoginComponent,
    SelectDifficultyComponent,
    PlayComponent,
    SelectPlaylistComponent,
    ScoreComponent,
    UserStatsComponent,
    StatsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessageModule,
    BrowserAnimationsModule,
    MenubarModule,
    CardModule,
    CarouselModule,
    FormsModule,
    TableModule,
    TabViewModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    DataService,
    PlaylistService,
    AuthInitializer,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
