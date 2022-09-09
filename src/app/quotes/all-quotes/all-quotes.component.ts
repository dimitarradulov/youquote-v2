import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

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
export class AllQuotesComponent implements OnInit, AfterViewInit, OnDestroy {
  quotes: Quote[];
  paginatedQuotes: Quote[];
  pageSize = 5;
  subscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private quotesService: QuotesService,
    public loadingService: LoadingService,
    public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    const quotes$ = this.quotesService.getAll();
    this.subscription = this.loadingService
      .showLoaderUntilComplete(quotes$)
      .pipe(
        catchError((err) => {
          console.error(err);
          const message =
            'There was an error providing the quote/s.. Please try again!';
          this.errorMessageService.showError(message);
          return throwError(() => new Error(message));
        }),
        tap((quotes) => {
          this.quotes = this.paginatedQuotes = quotes;
          this.paginateQuotes();
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.loadPageSizeFromLocalStorage();
    this.paginator.page.subscribe((paginationData) => {
      this.savePageSizeToLocalStorage(paginationData.pageSize);
      this.paginateQuotes(paginationData.pageSize, paginationData.pageIndex);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPageLength() {
    return this.quotes?.length || 10;
  }

  paginateQuotes(pageSize = 5, pageIndex = 0) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.paginatedQuotes = this.quotes.slice(startIndex, endIndex);
  }

  private savePageSizeToLocalStorage(pageSize: number) {
    localStorage.setItem('page_size', pageSize.toString());
  }

  private loadPageSizeFromLocalStorage() {
    const loadedPageSize = localStorage.getItem('page_size');

    if (!loadedPageSize) return;

    this.pageSize = +loadedPageSize;
  }
}
