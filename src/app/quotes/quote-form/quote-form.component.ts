import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs/operators';

import { Quote } from 'src/app/quotes/models/quote.model';

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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      author: [
        this.quoteData?.author ?? '',
        [Validators.required, Validators.minLength(2)],
        this.checkForBadWords.bind(this),
      ],
      authorImageUrl: [
        this.quoteData?.authorImageUrl ?? '',
        [Validators.pattern(this.validImageUrlRegex)],
      ],
      content: [
        this.quoteData?.content ?? '',
        [Validators.required, Validators.minLength(20)],
        this.checkForBadWords.bind(this),
      ],
    });
  }

  onSubmit() {
    this.quoteChanges.emit(this.quoteForm.value);
  }

  onCancel() {
    this.location.back();
  }

  private checkForBadWords(control: AbstractControl) {
    const url = 'https://community-purgomalum.p.rapidapi.com/containsprofanity';

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'fe849fed34msh2b0be05016574cap1b1557jsnc7cc01b95738',
      'X-RapidAPI-Host': 'community-purgomalum.p.rapidapi.com',
    });

    return this.http
      .get<Boolean>(url, {
        params: new HttpParams().append('text', control.value),
        headers,
      })
      .pipe(
        map((value) => {
          if (!value) return null;

          return { badWord: true };
        })
      );
  }
}
