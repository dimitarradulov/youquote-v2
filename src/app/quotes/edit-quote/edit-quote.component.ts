import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { QuotesService } from '../quotes.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ErrorMessageService } from './../../shared/error-message/error-message.service';
import { Quote } from 'src/app/shared/models/quote.model';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss'],
  providers: [LoadingService, ErrorMessageService],
})
export class EditQuoteComponent implements OnInit {
  quote$: Observable<Quote>;
  quoteId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quotesServices: QuotesService,
    public loadingService: LoadingService,
    public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.quote$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        this.quoteId = <string>paramMap.get('quoteId');

        const quoteObs$ = this.quotesServices.getOne(this.quoteId);

        return this.loadingService
          .showLoaderUntilComplete(quoteObs$)
          .pipe(catchError(this.handleError));
      })
    );
  }

  onEdit(changes: Partial<Quote>) {
    const updateQuote$ = this.quotesServices.update(this.quoteId, changes);

    this.loadingService
      .showLoaderUntilComplete(updateQuote$)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.router.navigate(['../../my'], { relativeTo: this.route });
      });
  }

  private handleError(error: Error) {
    console.error(error);
    const message =
      'There was an error providing the quote/s.. Please try again!';
    this.errorMessageService.showError(message);
    return throwError(() => new Error(message));
  }
}
