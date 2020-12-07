import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor () { }

  ngOnInit (): void {
  }

  onSubmit (userDetailsForm: NgForm): void {
    console.log(userDetailsForm.value.Gender)
  }
}
