import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  template: `
    <div class="spinner-container">
      <mat-spinner mode="indeterminate"></mat-spinner>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  constructor() {}
}
