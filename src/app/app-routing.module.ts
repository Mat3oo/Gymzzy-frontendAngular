import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/home/login/login.component'
import { RegistrationComponent } from './components/home/registration/registration.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { AddTrainingComponent } from './components/user-panel/add-training/add-training.component'
import { EditTrainingComponent } from './components/user-panel/edit-training/edit-training.component'
import { TrainingHistoryComponent } from './components/user-panel/training-history/training-history.component'
import { UserPanelComponent } from './components/user-panel/user-panel.component'
import { UserProfileComponent } from './components/user-panel/user-profile/user-profile.component'

import { AuthGuardService } from './services/auth-guard.service'
import { LoggedUserGuardService } from './services/logged-user-guard.service'

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/home/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedUserGuardService],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
  },
  {
    path: 'user',
    component: UserPanelComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'history', component: TrainingHistoryComponent },
      { path: 'addTraining', component: AddTrainingComponent },
      { path: 'editTraining/:id', component: EditTrainingComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/home/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
