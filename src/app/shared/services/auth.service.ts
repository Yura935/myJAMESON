import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Profile } from '../classes/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkSignIn: Subject<any> = new Subject<any>();
  userRef: AngularFirestoreCollection<any> = null;
  private dbPath = '/users';

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
    this.userRef = this.db.collection(this.dbPath);
  }

  signUp(email: string, password: string, userName: string, userPhone: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = new Profile(userResponse.user.email);
        this.db.collection('users').add({ ...user })
          .then(collection => {
            collection.get()
              .then(user => {
                const myUser = {
                  id: user.id,
                  ...user.data() as any
                }
                localStorage.setItem('user', JSON.stringify(myUser));
                const ROLE = JSON.parse(localStorage.getItem('user'))
                if (ROLE.role === 'user') {
                  this.router.navigateByUrl('profile');
                }
                else {
                  this.router.navigateByUrl('home');
                }
              });
          });
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  }

  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        console.log(userResponse);
        this.db.collection('users').ref.where('email', '==', userResponse.user.email).onSnapshot(
          snap => {
            snap.forEach(user => {
              const myUser = {
                id: user.id,
                ...user.data() as any
              };
              localStorage.setItem('user', JSON.stringify(myUser));
              this.checkSignIn.next(true);
              this.router.navigateByUrl('profile');
            });
          }
        );
      })
      .catch(err => {
        alert(err);
        console.log(err);
      })
  }

  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('basket');
        this.checkSignIn.next(false);
        this.router.navigateByUrl('home');
      })
      .catch(err => {
        alert(err);
        console.log(err);
      })
  }

  updateUserData(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update({ ...data });
  }
}
