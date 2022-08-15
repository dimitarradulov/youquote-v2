import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorMessageService } from '../shared/error-message/error-message.service';
import { Quote } from '../shared/models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  constructor(
    private firestore: Firestore,
    private errorMessageService: ErrorMessageService
  ) {}

  getAll() {
    const quotesCollection = collection(
      this.firestore,
      'quotes'
    ) as CollectionReference<Quote>;

    return collectionData(quotesCollection).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(err: Error) {
    console.error(err);
    const message =
      'There was an error providing the quote/s.. Please try again!';
    this.errorMessageService.showError(message);
    return throwError(() => new Error(message));
  }
}
