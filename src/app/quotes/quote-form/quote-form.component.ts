import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit {
  quoteForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.quoteForm = new FormGroup({
      author: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      authorImageUrl: new FormControl('', [Validators.required]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }
}
