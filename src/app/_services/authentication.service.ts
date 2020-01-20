import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<firebase.User>;
    public currentUser: Observable<firebase.User>;

    constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth) {
        this.currentUserSubject = new BehaviorSubject<firebase.User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): firebase.User {
        return this.currentUserSubject.value;
    }

  /* Sign in */
  async SignIn(email: string, password: string) {
    const result = await this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password);
    localStorage.setItem('currentUser', JSON.stringify(this.angularFireAuth.auth.currentUser));
    this.currentUserSubject.next(this.angularFireAuth.auth.currentUser);
  }
  async SignUp(controlls) {
    const displayName = controlls.firstName.value + ' ' + controlls.lastName.value;
    const result = await this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(controlls.email.value, controlls.password.value);
    const  user = this.angularFireAuth.auth.currentUser;
    return user.updateProfile({
      displayName
    });
  }

    logout() {
        // remove user data from local storage for log out
      this.angularFireAuth
        .auth
        .signOut();
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
