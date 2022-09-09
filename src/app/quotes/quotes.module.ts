import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { QuotesRoutingModule } from './quotes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { SingleQuoteComponent } from './single-quote/single-quote.component';
import { SharedModule } from '../shared/shared.module';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AllQuotesComponent,
    SingleQuoteComponent,
    MyQuotesComponent,
    QuoteFormComponent,
    EditQuoteComponent,
    AddQuoteComponent,
    ViewQuoteComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuotesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    SharedModule,
  ],
})
export class QuotesModule {}
