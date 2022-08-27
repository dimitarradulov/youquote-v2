import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuotesRoutingModule } from './quotes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { SingleQuoteComponent } from './single-quote/single-quote.component';
import { SharedModule } from '../shared/shared.module';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';

@NgModule({
  declarations: [
    AllQuotesComponent,
    SingleQuoteComponent,
    MyQuotesComponent,
    QuoteFormComponent,
    EditQuoteComponent,
    AddQuoteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuotesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
})
export class QuotesModule {}
