import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'quotes/all', pathMatch: 'full' },
  {
    path: 'quotes',
    loadChildren: () =>
      import('./quotes/quotes.module').then((m) => m.QuotesModule),
  },
  {
    path: 'authenticate',
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['/']) },
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
