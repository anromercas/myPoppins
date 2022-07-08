import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  created: any;
  email: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private firestore: Firestore, private router: Router) {
    const auth = getAuth();
    this.user = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        return this.db.doc(`users/${user.uid}`).valueChanges();
        
      } else {
        // User is signed out
        return of(null);
      }
    })
    
    // this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.db.doc(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // )
  }

  signIn(credentials): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  signUp(credentials) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(data => {
      return this.db.doc(`users/${data.user.uid}`).set({
        name: credentials.name,
        email: credentials.email,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  sendPasswordReset(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  updateUser(name) {
    return this.db.doc(`users/${firebase.auth().currentUser.uid}`).update({
      name
    });
  }
}
