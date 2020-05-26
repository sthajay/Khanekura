import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../shopping-list/edit-shopping/edit-shopping.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  @ViewChild('myForm', { static: true }) myForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    else {
      const email = form.value.email;
      const password = form.value.password;
      let authObs: Observable<AuthResponseData>;
      if (this.isLoginMode) {
        this.isLoading = true;
        authObs = this.authService.loginUser(email, password);
      }
      else {
        this.isLoading = true;
        authObs = this.authService.signUpUser(email, password);

      }

      authObs.subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;

        });

    }
    form.reset();
  }

  onErrorClose() {
    this.error = null;
  }

}
