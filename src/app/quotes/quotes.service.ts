import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Quote } from '../shared/models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  constructor(private firestore: Firestore) {}

  getAll() {
    const quotesCollection = collection(this.firestore, 'quotes');
    return collectionData(quotesCollection) as Observable<Quote[]>;
  }
}
