import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('AppComponent', () => {
  beforeEach(async(() => {  
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'spotyquiz-group1-frontend'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('spotyquiz-group1-frontend');
  }));
});
