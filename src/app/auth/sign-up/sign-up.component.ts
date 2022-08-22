import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFormValue, AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  error: null | string = null;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSignUp(formValue: AuthFormValue) {
    this.loading = true;
    this.error = null;

    try {
      await this.authService.signUp(formValue);
      this.router.navigate(['/']);
    } catch (err: any) {
      console.error(err.message);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
