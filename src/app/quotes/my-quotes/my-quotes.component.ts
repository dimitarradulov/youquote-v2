import { Component, OnInit } from '@angular/core';

import { Quote } from 'src/app/shared/models/quote.model';
import { QuotesService } from './../quotes.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
})
export class MyQuotesComponent implements OnInit {
  userQuotes: Quote[] = [];
  loading = false;
  error = null;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.quotesService
      .getAllUserQuotes()
      .then((quotes) => (this.userQuotes = quotes))
      .catch((err) => (this.error = err.message))
      .finally(() => (this.loading = false));
  }
}
