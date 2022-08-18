import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() isSignUpForm = false;
  signInForm: FormGroup;
  signUpForm: FormGroup = new FormGroup({});

  constructor() {}

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
    const currentForm = this.form;

    if (!this.form.valid) return;

    console.log(currentForm.value);
  }

  passwordsMatch(control: FormControl) {
    const currentPassword = this.form.value.password;

    if (control.value !== currentPassword) {
      return { passwordsNotMatching: true };
    }

    return null;
  }
}
