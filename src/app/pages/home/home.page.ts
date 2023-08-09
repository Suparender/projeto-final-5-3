import { Component, OnInit, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public env = environment;
  private auth: Auth = inject(Auth);
  authState = authState(this.auth);
  authStateSubscription: Subscription;

  public appUser = {
    logged: false,
    title: 'Login / Entrar',
    url: '/login',
    icon: 'log-in',
    avatar: ''
  }


  constructor() {
    this.things = collectionData(this.fbCollection, { idField: 'id' }) as Observable<any>
    this.authStateSubscription = this.authState.subscribe((aUser: User | null) => {
      if (aUser !== null) {
        this.appUser = {
          logged: true,
          title: aUser.displayName + '',
          url: '/profile',
          icon: 'log-out',
          avatar: aUser.photoURL + ''
        }
      }
    })
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }

  private firestore: Firestore = inject(Firestore)

  private fbCollection = collection(this.firestore, 'contacts')

  public things: Observable<any>
  
  ngOnInit() {
  }



}
