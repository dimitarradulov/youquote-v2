import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auth-error',
  template: '<p class="error-message">{{ errorMessage }}</p>',
  styleUrls: ['./auth-error.component.scss'],
})
export class AuthErrorComponent implements OnInit {
  @Input() errorMessage: string;

  constructor() {}

  ngOnInit(): void {}
}
