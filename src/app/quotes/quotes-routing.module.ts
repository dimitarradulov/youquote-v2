import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { AllQuotesComponent } from './all-quotes/all-quotes.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';

const routes: Routes = [
  { path: 'all', component: AllQuotesComponent },
  {
    path: 'my',
    component: MyQuotesComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['authenticate/sign-in']),
    },
  },
  {
    path: 'add',
    component: AddQuoteComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['authenticate/sign-in']),
    },
  },
  {
    path: 'edit/:quoteId',
    component: EditQuoteComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['authenticate/sign-in']),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
