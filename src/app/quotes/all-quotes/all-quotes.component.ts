import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Quote } from '../../shared/models/quote.model';
import { QuotesService } from '../quotes.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ErrorMessageService } from 'src/app/shared/error-message/error-message.service';

@Component({
  selector: 'all-quotes',
  templateUrl: './all-quotes.component.html',
  styleUrls: ['./all-quotes.component.scss'],
  providers: [LoadingService, ErrorMessageService],
})
export class AllQuotesComponent implements OnInit {
  quotes$: Observable<Quote[]>;

  constructor(
    private quotesService: QuotesService,
    public loadingService: LoadingService,
    public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    const quotes$ = this.quotesService.getAll();
    this.quotes$ = this.loadingService.showLoaderUntilComplete(quotes$).pipe(
      catchError((err) => {
        console.error(err);
        const message =
          'There was an error providing the quote/s.. Please try again!';
        this.errorMessageService.showError(message);
        return throwError(() => new Error(message));
      })
    );
  }
}
