import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, AuthResponseData} from "./auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoading = false;
  error: string = "";

  constructor(private auth: AuthService, private router: Router) {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;
    this.auth.signup(email, password).subscribe({
      next: responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: errorResponseData => {
        this.isLoading = false;
        this.error = this.auth.handleError(errorResponseData);
      }
    });
  }
}