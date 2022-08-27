import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  where,
  query,
  getDocs,
  doc,
  docSnapshots,
  DocumentReference,
  updateDoc,
} from '@angular/fire/firestore';
import { first, lastValueFrom, from, throwError } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Quote } from '../shared/models/quote.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getAll() {
    return collectionData(this.quotesCollection, { idField: 'id' }).pipe(
      shareReplay()
    );
  }

  async getAllUserQuotes() {
    try {
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
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  getOne(quoteId: string) {
    const document = this.getQuoteDocument(quoteId);

    return docSnapshots(document).pipe(
      map((docSnapshot) => <Quote>docSnapshot.data()),
      shareReplay()
    );
  }

  update(quoteId: string, changes: Partial<Quote>) {
    const document = this.getQuoteDocument(quoteId);

    return from(updateDoc(document, changes));
  }

  private get quotesCollection() {
    return collection(this.firestore, 'quotes') as CollectionReference<Quote>;
  }

  private getQuoteDocument(quoteId: string) {
    return doc(this.firestore, `quotes/${quoteId}`) as DocumentReference<Quote>;
  }
}
