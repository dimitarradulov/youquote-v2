import { Component, Input, OnInit } from '@angular/core';

import { ErrorMessageService } from './error-message.service';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string;

  constructor(private errorMessageService: ErrorMessageService) {}

  ngOnInit(): void {}

  onClose() {
    this.errorMessageService.hideError();
  }
}
