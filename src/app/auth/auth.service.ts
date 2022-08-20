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

export interface AuthFormValue {
  email: string;
  password: string;
  confirmPassword?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = authState(this.auth);

  constructor(private auth: Auth) {}

  async signIn({ email, password }: AuthFormValue) {
    try {
      const user = signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(this.auth, provider);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async signUp({ email, password }: AuthFormValue) {
    try {
      const user = createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (err) {
      throw err;
    }
  }

  logout() {
    signOut(this.auth);
  }
}
