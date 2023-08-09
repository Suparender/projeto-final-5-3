import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  authState = authState(this.auth)
  authStateSubscription = new Subscription
  user!: User
  userFirstName: String = 'Perfil de usuário'
  env = environment;


  // injeta a autenticação
  constructor(private auth: Auth = inject(Auth)) { }

  // coloca as informações do usuario em uma variavel
  ngOnInit() {
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {
        if (userData) {
          this.user = userData
          // pega o primeiro nome do usuario
          this.userFirstName = 'Olá ' + this.user.displayName?.split(' ')[0] 

        }
      }
    );
  }

// destroi a instancia dps que fecha o app
ngOnDestroy() {
  this.authStateSubscription.unsubscribe()
}

// desloga do perfil
logout() {
  this.auth.signOut();
  alert('Você saiu do aplicativo')
  location.href = '/home'
}

// manda para o perfil do google
toProviderProfile() {
  window.open('https://myaccount.google.com/', 'blank')
}


}
