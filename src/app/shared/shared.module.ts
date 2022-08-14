import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './loading/loading.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [LoadingComponent, ErrorMessageComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingComponent],
})
export class SharedModule {}
