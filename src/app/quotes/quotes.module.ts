import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesRoutingModule } from './quotes-routing.module';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';

@NgModule({
  declarations: [AllQuotesComponent],
  imports: [CommonModule, QuotesRoutingModule],
})
export class QuotesModule {}
