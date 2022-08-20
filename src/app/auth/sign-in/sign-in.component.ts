import { Component, OnInit } from '@angular/core';

import { AuthService, AuthFormValue } from './../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async onSignIn(formValue: AuthFormValue) {
    try {
      await this.authService.signIn(formValue);
    } catch (err) {
      console.error(err);
    }
  }
}
