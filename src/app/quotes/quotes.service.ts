import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  where,
  query,
  getDocs,
} from '@angular/fire/firestore';
import { first, lastValueFrom } from 'rxjs';

import { Quote } from '../shared/models/quote.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  get quotesCollection() {
    return collection(this.firestore, 'quotes') as CollectionReference<Quote>;
  }

  getAll() {
    return collectionData(this.quotesCollection, { idField: 'id' });
  }

  async getAllUserQuotes() {
    const quotes: Quote[] = [];

    const user = await lastValueFrom(this.authService.user$.pipe(first()));

    const q = query(this.quotesCollection, where('creator', '==', user?.uid));

    const userQuotes = await getDocs(q);
    userQuotes.forEach((doc) => {
      quotes.push({
        id: doc.id,
        author: doc.data().author,
        authorImageUrl: doc.data().authorImageUrl,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
      });
    });

    return quotes;
  }
}
