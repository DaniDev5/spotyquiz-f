import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

describe('LoginService', () => {
  let httpMock: HttpTestingController;
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService
      ],
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should return false isAuth on start', () => {
      expect(service.isAuth()).toBeFalsy();
  });

  xit('should return undefined token on start', () => {
    expect(service.getAccessToken()).toBeUndefined();
  });

  xit('should return false user loading on start', () => {
    expect(service.getLoading()).toBeFalsy();
  });
});

