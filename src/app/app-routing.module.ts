import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/home/login/login.component'
import { RegistrationComponent } from './components/home/registration/registration.component'
import { UserPanelComponent } from './components/user-panel/user-panel.component'
import { UserProfileComponent } from './components/user-panel/user-profile/user-profile.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserPanelComponent,
    children: [
      {
        path: 'profile',
        component: UserProfileComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
