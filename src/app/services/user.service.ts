import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { User } from './auth.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private auth: Auth,) { }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id'}) as Observable<User[]>;
  }
 
  getUserById(id): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>;
  }
 
  addUser(note: User) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, note);
  }
 
  deleteUser(user: User) {
    const noteDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNameAndLastName(name: string, lastName: string) {
    const user = this.auth.currentUser;
    const noteDocRef = doc(this.firestore, `users/${user.uid}`);
    return updateDoc(noteDocRef, {name, lastName});
  }
   
  updateRole(role: string) {
    const user = this.auth.currentUser;
    const noteDocRef = doc(this.firestore, `users/${user.uid}`);
    return updateDoc(noteDocRef, {role});
  }

  updateGender(gender: string) {
    const user = this.auth.currentUser;
    const noteDocRef = doc(this.firestore, `users/${user.uid}`);
    return updateDoc(noteDocRef, {gender});
  }

  updateAddress({city, street, streetNumber}: {city: string, street: string, streetNumber: string}) {
    const user = this.auth.currentUser;
    const noteDocRef = doc(this.firestore, `users/${user.uid}`);
    return updateDoc(noteDocRef, {city, street, streetNumber});
  }

  updateChildren(gender: string, dateofBirth: string, expectingChild: boolean) {
    const user = this.auth.currentUser;
    const noteDocRef = doc(this.firestore, `users/${user.uid}/childens`);
    return updateDoc(noteDocRef, {gender, dateofBirth, expectingChild});
  }
 
}
