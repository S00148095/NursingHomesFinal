/*============================================================================
==============================================================================
    AuthService
    This service handles all of the Firebase authentication bits and bobs
==============================================================================
============================================================================*/


import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';


@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    public toastr: ToastsManager) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  canActivate(): Observable<boolean> {//guards the routes, directing the user to the login page if not logged in
    return this.afAuth.authState.map(authState => {
      if (!authState) this.router.navigate(['/webSide/login']);
      return !!authState;
    });
  }

  logout() {//logs the user out
    this.afAuth
      .auth
      .signOut();
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): any {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        //this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  retUserDisplayName() {
    return this.currentUserDisplayName();
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        this.updateUserData('anon')
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string, firstname: string,surname: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserDisplayName(firstname+" "+surname)
        this.showSuccess("Thanks for signing up");
      })
      .catch(error =>{
        this.showWarning(error.message);
      });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData(this.authState.displayName);
        this.router.navigate(['/webSide/account']);
      })
      .catch(error => 
        this.showWarning(error.message));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(val => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  //// Helpers ////
  private updateUserData(name: string): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
      email: this.authState.email,
      name: name
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

  //update a user's displayName
  updateUserDisplayName(username): void {
    firebase.auth().currentUser.updateProfile({
      displayName: username,
      photoURL: null
    });
    /*
    .then(ret =>{
      this.updateUserData()}
    );
    */
  }  
  showSuccess(message:string) {//shows a toast
    this.toastr.success(message);
  }
  showWarning(message:string) {//shows a toast
    this.toastr.warning(message);
  }

  changePassword()
  {
    
  }
  changeEmail()
  {
    
  }
}
