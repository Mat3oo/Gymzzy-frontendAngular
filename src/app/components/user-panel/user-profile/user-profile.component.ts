import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import { UserService } from 'src/app/services/user.service'
import { IUserDetailsModel } from '../../../models/ServerResponses/IUserDetailsModel'
import { RespondErrorCodes } from 'src/app/common/RespondErrorCodes'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetailsForm = this._formBuilder.group({
    Email: [''],
    Name: ['', Validators.required],
    LastName: ['', Validators.required],
    Gender: ['none'],
    Nick: ['', Validators.required],
    Height: ['', [Validators.pattern('^[0-9]+(\.[0-9]{1})?$'), Validators.required]],
    Weight: ['', [Validators.pattern('^[0-9]+(\.[0-9]{1})?$'), Validators.required]],
    Birthday: ['', Validators.required]
  })

  constructor (private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService) { }

  ngOnInit (): void {
    this._userService.getUserDetails().subscribe(
      (res: IUserDetailsModel) => {
        this.Email?.setValue(res.email)
        this.Name?.setValue(res.name)
        this.LastName?.setValue(res.lastName)
        this.Gender?.setValue(res.gender ? res.gender : 'none')
        this.Nick?.setValue(res.userName)
        this.Height?.setValue(res.height)
        this.Weight?.setValue(res.weight)
        this.Birthday?.setValue(res.birthday?.split('T')[0])
      }
    )
  }

  onSubmit (): void {
    this._userService.updateUserDetails({
      name: this.Name?.value,
      lastName: this.LastName?.value,
      userName: this.Nick?.value,
      gender: this.Gender?.value === 'none' ? null : this.Gender?.value,
      height: this.Height?.value,
      weight: this.Weight?.value,
      birthday: this.Birthday?.value
    }).subscribe(
      success => {
        this._toastrService.success('User details updated.', 'Update success')
      },
      (err: any) => {
        if (Array.isArray(err)) {
          this._toastrService.clear();
          (err as RespondErrorCodes[]).forEach(element => {
            switch (element) {
              case RespondErrorCodes.DuplicatedNick:
                this._toastrService.error(`Nick: ${this.Nick?.value} is already taken.`, 'Update failed!')
                break
              case RespondErrorCodes.InvalidUserName:
                this._toastrService.error('Nick is invalid, can only contain letters or digits.', 'Update failed!')
                break
              default:
                this._toastrService.error('Unknown error, check inputs and try again.', 'Update failed!')
                break
            }
          })
        } else {
          this._toastrService.error('Something goes wrong. Try again later.', 'Error')
        }
      }
    )
  }

  get Email (): AbstractControl | null { return this.userDetailsForm.get('Email') }
  get Name (): AbstractControl | null { return this.userDetailsForm.get('Name') }
  get LastName (): AbstractControl | null { return this.userDetailsForm.get('LastName') }
  get Gender (): AbstractControl | null { return this.userDetailsForm.get('Gender') }
  get Nick (): AbstractControl | null { return this.userDetailsForm.get('Nick') }
  get Height (): AbstractControl | null { return this.userDetailsForm.get('Height') }
  get Weight (): AbstractControl | null { return this.userDetailsForm.get('Weight') }
  get Birthday (): AbstractControl | null { return this.userDetailsForm.get('Birthday') }
}
