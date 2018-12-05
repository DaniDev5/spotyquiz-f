import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentUser } from '../../model/currentUser';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: CurrentUser;
  isAuth: boolean;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
      this.isAuth = this.currentUser.isLogged();
    });

    if (this.route.snapshot.queryParams.code) {
      this.loginService.login(this.route.snapshot.queryParams.code).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (httpErrorResponse: HttpErrorResponse) => {
          alert('Error: ' + httpErrorResponse.message);
          this.router.navigate(['/']);
        }
      );
    }

    const paramError: string = this.route.snapshot.queryParams.error;
    if (paramError) {
      alert('Error: ' + paramError);
      this.router.navigate(['/']);
    }
  }

}
