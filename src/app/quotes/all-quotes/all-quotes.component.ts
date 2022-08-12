import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Quote } from '../../shared/models/quote.model';
import { QuotesService } from '../quotes.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'all-quotes',
  templateUrl: './all-quotes.component.html',
  styleUrls: ['./all-quotes.component.scss'],
  providers: [LoadingService],
})
export class AllQuotesComponent implements OnInit {
  quotes$: Observable<Quote[]>;

  constructor(
    private quotesService: QuotesService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const quotes$ = this.quotesService.getAll();
    this.quotes$ = this.loadingService.showLoaderUntilComplete(quotes$);
  }
}
