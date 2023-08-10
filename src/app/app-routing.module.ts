import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard/';
import { environment as env } from 'src/environments/environment';

const toLogin = () => redirectUnauthorizedTo(['/login'])
const toHome = () => redirectLoggedInTo(['/home'])

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: `${env.appName} - Ínicio`,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'e404',
    title: `${env.appName} - Erro 404`,
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'privacypolices',
    title: `${env.appName} - Políticas de privacidade`,
    loadChildren: () => import('./pages/privacypolices/privacypolices.module').then(m => m.PrivacypolicesPageModule)
  },
  {
    path: 'contact',
    title: `${env.appName} - Contate-nos`,
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'about',
    title: `${env.appName} - Sobre`,
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'login',
    title: `${env.appName} - Login / Entrar`,
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },
  {
    path: 'profile',
    title: `${env.appName} - Perfil`,
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'view',
    title: `${env.appName} - Visualizar`,
    loadChildren: () => import('./pages/one-view/one-view.module').then( m => m.OneViewPageModule)
  },
  {
    path: 'edit',
    title: `${env.appName} - Editar`,
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: '**',
    redirectTo: '/e404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
