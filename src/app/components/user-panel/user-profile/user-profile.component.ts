import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'

import { UserService } from 'src/app/services/user.service'
import { IUserDetailsModel } from '../../../models//IUserDetailsModel'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetailsForm = this._formBuilder.group({
    Email: [''],
    Name: [''],
    LastName: [''],
    Gender: ['none'],
    UserName: ['', Validators.required],
    Height: ['', Validators.pattern('^[0-9].*$')],
    Weight: ['', Validators.pattern('^[0-9].*$')],
    Birthday: ['']
  })

  constructor (private _formBuilder: FormBuilder,
    private _userService: UserService) { }

  ngOnInit (): void {
    this._userService.getUserDetails().subscribe(
      (res: IUserDetailsModel) => {
        this.Email?.setValue(res.email)
        this.Name?.setValue(res.name)
        this.LastName?.setValue(res.lastName)
        this.Gender?.setValue(res.gender)
        this.UserName?.setValue(res.userName)
        this.Height?.setValue(res.height)
        this.Weight?.setValue(res.weight)
        this.Birthday?.setValue(res.birthday?.split('T')[0])
      }
    )
  }

  onSubmit (): void {
  }

  get Email (): AbstractControl | null { return this.userDetailsForm.get('Email') }
  get Name (): AbstractControl | null { return this.userDetailsForm.get('Name') }
  get LastName (): AbstractControl | null { return this.userDetailsForm.get('LastName') }
  get Gender (): AbstractControl | null { return this.userDetailsForm.get('Gender') }
  get UserName (): AbstractControl | null { return this.userDetailsForm.get('UserName') }
  get Height (): AbstractControl | null { return this.userDetailsForm.get('Height') }
  get Weight (): AbstractControl | null { return this.userDetailsForm.get('Weight') }
  get Birthday (): AbstractControl | null { return this.userDetailsForm.get('Birthday') }
}
