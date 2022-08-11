import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuotesComponent } from './all-quotes/all-quotes.component';

const routes: Routes = [{ path: 'quotes/all', component: AllQuotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
