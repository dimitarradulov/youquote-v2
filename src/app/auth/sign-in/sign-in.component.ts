import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, AuthFormValue } from './../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  error: null | string = null;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSignIn(formValue: AuthFormValue) {
    this.loading = true;
    this.error = null;
    try {
      await this.authService.signIn(formValue);
      this.router.navigate(['/']);
    } catch (err: any) {
      console.error(err.code);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
