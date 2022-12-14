import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../models/quote.model';

@Component({
  selector: 'single-quote',
  templateUrl: './single-quote.component.html',
  styleUrls: ['./single-quote.component.scss'],
})
export class SingleQuoteComponent implements OnInit {
  @Input() quoteData: Quote;

  constructor() {}

  ngOnInit(): void {}

  setAuthorImageUrl() {
    return this.quoteData.authorImageUrl || '../../../assets/no-avatar.jpg';
  }
}
