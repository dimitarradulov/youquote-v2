import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Quote } from 'src/app/quotes/models/quote.model';
import { QuotesService } from '../quotes.service';
import { ErrorMessageService } from 'src/app/shared/error-message/error-message.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
  providers: [LoadingService, ErrorMessageService],
})
export class AddQuoteComponent implements OnInit {
  constructor(
    private quotesService: QuotesService,
    private router: Router,
    public errorMessageService: ErrorMessageService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  onAdd(quoteData: Partial<Quote>) {
    const addQuote$ = this.quotesService.add(quoteData).pipe(
      catchError((err) => {
        console.error(err);
        this.errorMessageService.showError(err.message);
        return throwError(() => new Error(err));
      })
    );

    this.loadingService.showLoaderUntilComplete(addQuote$).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
