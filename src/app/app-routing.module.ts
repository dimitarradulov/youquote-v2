import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'quotes/all', pathMatch: 'full' },
  {
    path: 'quotes',
    loadChildren: () =>
      import('./quotes/quotes.module').then((m) => m.QuotesModule),
  },
  {
    path: 'authenticate',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
