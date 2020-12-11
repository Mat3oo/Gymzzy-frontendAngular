import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/home/login/login.component'
import { RegistrationComponent } from './components/home/registration/registration.component'
import { UserPanelComponent } from './components/user-panel/user-panel.component'
import { UserProfileComponent } from './components/user-panel/user-profile/user-profile.component';
import { TrainingHistoryComponent } from './components/user-panel/training-history/training-history.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    UserPanelComponent,
    UserProfileComponent,
    TrainingHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
