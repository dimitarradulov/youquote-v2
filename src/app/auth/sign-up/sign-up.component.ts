import { Component, OnInit } from '@angular/core';

import { AuthFormValue, AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async onSignUp(formValue: AuthFormValue) {
    try {
      await this.authService.signUp(formValue);
    } catch (err) {
      console.error(err);
    }
  }
}
