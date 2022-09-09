import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorMessageService } from 'src/app/shared/error-message/error-message.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { QuotesService } from '../quotes.service';
import { Quote } from 'src/app/shared/models/quote.model';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.scss'],
  providers: [LoadingService, ErrorMessageService],
})
export class ViewQuoteComponent implements OnInit {
  quote$: Observable<Quote>;
  userLikes$: Observable<string[]>;
  quoteLikedByUser$: Observable<boolean>;
  quoteId: string;

  constructor(
    private quotesService: QuotesService,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.userLikes$ = this.quotesService.userLikes$;
    this.quoteLikedByUser$ = this.quotesService.quoteLikedByUser$;

    this.quoteId = this.route.snapshot.params['quoteId'];
    const getQuote$ = this.quotesService.getOne(this.quoteId);

    this.quote$ = this.loadingService.showLoaderUntilComplete(getQuote$).pipe(
      catchError((err) => {
        this.errorMessageService.showError(err.message);
        return throwError(() => new Error(err));
      })
    );
  }

  onLike() {
    this.quotesService
      .addOrRemoveLike(this.quoteId)
      .pipe(
        catchError((err) => {
          this.errorMessageService.showError(
            'Your like was not able to be processed on the server... Please try again!'
          );
          return throwError(() => new Error(err));
        })
      )
      .subscribe();
  }
}
