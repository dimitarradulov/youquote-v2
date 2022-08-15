import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ErrorMessageService {
  private errorChange = new BehaviorSubject<string>('');
  error$ = this.errorChange.asObservable();

  showError(errorMesssage: string) {
    this.errorChange.next(errorMesssage);
  }

  hideError() {
    this.errorChange.next('');
  }
}
