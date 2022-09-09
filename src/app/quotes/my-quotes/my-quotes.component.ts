import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

import { Quote } from 'src/app/quotes/models/quote.model';
import { QuotesService } from './../quotes.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ErrorMessageService } from 'src/app/shared/error-message/error-message.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
  providers: [LoadingService, ErrorMessageService],
})
export class MyQuotesComponent implements OnInit {
  userQuotes$: Observable<Quote[]>;

  constructor(
    private quotesService: QuotesService,
    public dialog: MatDialog,
    public loadingService: LoadingService,
    public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.loadUserQuotes();
  }

  onDelete(quoteId: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { quoteId },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(({ quoteId }) => this.quotesService.delete(quoteId)),
        catchError((err) => {
          const message = 'Delete operation failed.. Please try again!';
          return this.handleError(err, message);
        })
      )
      .subscribe(() => this.loadUserQuotes());
  }

  private loadUserQuotes() {
    const getAllUserQuotes$ = from(this.quotesService.getAllUserQuotes());

    this.userQuotes$ = this.loadingService
      .showLoaderUntilComplete(getAllUserQuotes$)
      .pipe(
        catchError((err) => {
          const message =
            'There was an error providing the quote/s.. Please try again!';
          return this.handleError(err, message);
        })
      );
  }

  private handleError(error: Error, message: string) {
    console.error(error);
    this.errorMessageService.showError(message);
    return throwError(() => new Error(message));
  }
}
