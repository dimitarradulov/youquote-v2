import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuotesRoutingModule } from './quotes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { SingleQuoteComponent } from './single-quote/single-quote.component';
import { SharedModule } from '../shared/shared.module';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';

@NgModule({
  declarations: [
    AllQuotesComponent,
    SingleQuoteComponent,
    MyQuotesComponent,
    QuoteFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuotesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    SharedModule,
  ],
})
export class QuotesModule {}
