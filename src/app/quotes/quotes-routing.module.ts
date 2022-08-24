import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';

const routes: Routes = [
  { path: 'all', component: AllQuotesComponent },
  { path: 'my', component: MyQuotesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
