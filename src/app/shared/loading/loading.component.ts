import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div class="spinner-container" [ngClass]="{ overlay: overlay }">
      <mat-spinner mode="indeterminate"></mat-spinner>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() overlay = false;

  constructor() {}
}
