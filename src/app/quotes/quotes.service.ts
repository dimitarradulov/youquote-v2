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
import { BehaviorSubject, from } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { Quote } from '../shared/models/quote.model';
import { AuthService } from '../auth/auth.service';
import { User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  private userLikesChange = new BehaviorSubject<string[]>([]);
  userLikes$ = this.userLikesChange.asObservable();
  quoteLikedByUser$ = this.userLikes$.pipe(
    map((userLikes) => userLikes.some((userId) => userId === this.user?.uid))
  );

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
      tap((quoteData) => {
        if (quoteData.likes) this.userLikesChange.next(quoteData.likes);
        else this.userLikesChange.next([]);
      }),
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

  addOrRemoveLike(quoteId: string) {
    const userLikes = [...this.userLikesChange.getValue()];

    const didUserLikeQuote = userLikes.some(
      (userId) => userId === this.user?.uid
    );

    const userIdIndex = userLikes.findIndex(
      (userId) => userId === this.user?.uid
    );

    if (didUserLikeQuote) {
      userLikes.splice(userIdIndex, 1);
    } else {
      userLikes.push(<string>this.user?.uid);
    }

    this.userLikesChange.next(userLikes);

    const quoteDoc = this.getQuoteDocument(quoteId);

    return from(updateDoc(quoteDoc, { likes: userLikes }));
  }

  private get quotesCollection() {
    return collection(this.firestore, 'quotes') as CollectionReference<Quote>;
  }

  private getQuoteDocument(quoteId: string) {
    return doc(this.firestore, `quotes/${quoteId}`) as DocumentReference<Quote>;
  }
}
