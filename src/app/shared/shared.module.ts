import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LoadingComponent } from './loading/loading.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [LoadingComponent, ErrorMessageComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [LoadingComponent, ErrorMessageComponent],
})
export class SharedModule {}
