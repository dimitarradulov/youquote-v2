import { Component, OnInit } from '@angular/core';

import { Quote } from 'src/app/shared/models/quote.model';
import { QuotesService } from './../quotes.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
})
export class MyQuotesComponent implements OnInit {
  userQuotes: Promise<Quote[]>;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.userQuotes = this.quotesService.getAllUserQuotes();
  }
}
