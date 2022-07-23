import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

export interface User {
  id?: string;
  created: any;
  email: string;
  name: string;
  lastName: string;
  role: string;
  gender:string;
  cityAddress: string;
  streetAddress: string;
  streetNumberAddress: number;
  careFfrecuency: string;
  careDays: string[];
  afterSchool: boolean;
  additionalTasks: string[];
  nanySalary: string[];
  imageProfileUrl: string;
  Description: string;
}

export interface Children {
  dateofBirth: string;
  gender: string;
  expectingChild: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }
 
  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }
 
  logout() {
    return signOut(this.auth);
  }

}
