import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

export interface AuthFormValue {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthError {
  code: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = authState(this.auth);

  constructor(private auth: Auth, private firestore: Firestore) {}

  async signIn({ email, password }: AuthFormValue) {
    try {
      const user = signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(this.auth, provider);

      await setDoc(doc(this.firestore, 'users', user.user.email || ''), {
        email: user.user.email,
        uid: user.user.uid,
      });

      return user;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async signUp({ email, password }: AuthFormValue) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await setDoc(doc(this.firestore, 'users', user.user.email || ''), {
        email: user.user.email,
        uid: user.user.uid,
        createdAt: new Date(),
      });

      return user;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  logout() {
    signOut(this.auth);
  }

  private handleError(error: any): AuthError {
    let errorMessage = 'Oops, something went wrong.. Try again!';

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email!';
        break;
      case 'auth/user-disabled':
        errorMessage = 'The user has been disabled!';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found!';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Wrong password!';
        break;
      case 'auth/account-exists-with-different-credential':
        errorMessage =
          'There already exists an account with the email address asserted by the credential!';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Only one popup request is allowed at one time!';
        break;
      case 'auth/operation-not-allowed':
        errorMessage =
          'Account corresponding to the credential is not enabled!';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Popup was blocked by the browser!';
        break;
      case 'auth/popup-closed-by-user':
        errorMessage =
          'Popup window closed without completing the sign in to the provider!';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'There is an account with the given email address!';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password not strong enough!';
        break;
    }

    return { code: error.code, message: errorMessage };
  }
}
