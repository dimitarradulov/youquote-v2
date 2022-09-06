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
  deleteDoc,
  addDoc,
  orderBy,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Quote } from '../shared/models/quote.model';
import { AuthService } from '../auth/auth.service';
import { User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  user: User | null;

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.authService.userData.subscribe((user) => (this.user = user));
  }

  getAll() {
    return collectionData(this.quotesCollection, { idField: 'id' }).pipe(
      map((quotes) =>
        quotes.sort((a: any, b: any) => b.createdAt - a.createdAt)
      ),
      shareReplay()
    );
  }

  async getAllUserQuotes() {
    try {
      const quotes: Quote[] = [];

      const q = query(
        this.quotesCollection,
        where('creator', '==', this.user?.uid ?? ''),
        orderBy('createdAt', 'desc')
      );

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

  delete(quoteId: string) {
    const document = this.getQuoteDocument(quoteId);

    return from(deleteDoc(document));
  }

  add(quoteData: Partial<Quote>) {
    const dbRef = this.quotesCollection;

    const quote: Partial<Quote> = {
      ...quoteData,
      createdAt: new Date(),
      creator: this.user?.uid ?? '',
    };

    return from(addDoc(dbRef, quote));
  }

  private get quotesCollection() {
    return collection(this.firestore, 'quotes') as CollectionReference<Quote>;
  }

  private getQuoteDocument(quoteId: string) {
    return doc(this.firestore, `quotes/${quoteId}`) as DocumentReference<Quote>;
  }
}
