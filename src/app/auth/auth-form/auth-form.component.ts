import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, AuthFormValue } from './../auth.service';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() isSignUpForm = false;
  @Output() formSubmit = new EventEmitter();
  signInForm: FormGroup;
  signUpForm: FormGroup = new FormGroup({});
  error = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.passwordsMatch.bind(this),
      ]),
    });
  }

  get form() {
    return this.isSignUpForm ? this.signUpForm : this.signInForm;
  }

  onSubmit() {
    const currentFormValue: AuthFormValue = this.form.value;

    if (!this.form.valid) return;

    this.formSubmit.emit(currentFormValue);
  }

  async onSignInWithGoogle() {
    try {
      this.error = null;
      await this.authService.signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      this.error = err.message;
    }
  }

  passwordsMatch(control: FormControl) {
    const currentPassword = this.form.value.password;

    if (control.value !== currentPassword) {
      return { passwordsNotMatching: true };
    }

    return null;
  }
}
