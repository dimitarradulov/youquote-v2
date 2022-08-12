import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingChange = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingChange.asObservable();

  showLoaderUntilComplete<T>(obs$: Observable<T>) {
    return of(null).pipe(
      tap(() => this.startLoading()),
      switchMap(() => obs$),
      tap(() => this.stopLoading())
    );
  }

  startLoading() {
    this.loadingChange.next(true);
  }

  stopLoading() {
    this.loadingChange.next(false);
  }
}
