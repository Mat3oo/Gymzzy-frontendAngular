import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/home/login/login.component'
import { RegistrationComponent } from './components/home/registration/registration.component'
import { UserPanelComponent } from './components/user-panel/user-panel.component'
import { UserProfileComponent } from './components/user-panel/user-profile/user-profile.component'
import { TrainingHistoryComponent } from './components/user-panel/training-history/training-history.component'
import { AddTrainingComponent } from './components/user-panel/add-training/add-training.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    UserPanelComponent,
    UserProfileComponent,
    TrainingHistoryComponent,
    AddTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
