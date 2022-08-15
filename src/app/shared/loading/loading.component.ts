import { Component } from '@angular/core';

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
