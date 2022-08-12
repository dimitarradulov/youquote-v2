import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../shared/models/quote.model';

@Component({
  selector: 'single-quote',
  templateUrl: './single-quote.component.html',
  styleUrls: ['./single-quote.component.scss'],
})
export class SingleQuoteComponent implements OnInit {
  @Input() quoteData: Quote;

  constructor() {}

  ngOnInit(): void {}
}
