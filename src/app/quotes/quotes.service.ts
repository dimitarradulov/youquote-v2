import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';

import { Quote } from '../shared/models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  constructor(private firestore: Firestore) {}

  getAll() {
    const quotesCollection = collection(
      this.firestore,
      'quotes'
    ) as CollectionReference<Quote>;

    return collectionData(quotesCollection);
  }
}
