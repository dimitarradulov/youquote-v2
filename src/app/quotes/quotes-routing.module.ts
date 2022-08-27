import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';

const routes: Routes = [
  { path: 'all', component: AllQuotesComponent },
  { path: 'my', component: MyQuotesComponent },
  { path: 'add', component: AddQuoteComponent },
  { path: 'edit/:quoteId', component: EditQuoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
