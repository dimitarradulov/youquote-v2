import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Quote } from 'src/app/shared/models/quote.model';

export interface QuoteFormButtonsConfig {
  submitButtonName: string;
  cancelButton: boolean;
}

@Component({
  selector: 'quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit {
  @Input() quoteData: Quote;
  @Input() buttonsConfig: QuoteFormButtonsConfig;
  @Output() quoteChanges = new EventEmitter<Partial<Quote>>();
  quoteForm: FormGroup;
  validImageUrlRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  constructor() {}

  ngOnInit(): void {
    this.quoteForm = new FormGroup({
      author: new FormControl(this.quoteData.author, [
        Validators.required,
        Validators.minLength(2),
      ]),
      authorImageUrl: new FormControl(this.quoteData.authorImageUrl, [
        Validators.required,
        Validators.pattern(this.validImageUrlRegex),
      ]),
      content: new FormControl(this.quoteData.content, [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  onSubmit() {
    this.quoteChanges.emit(this.quoteForm.value);
  }
}
