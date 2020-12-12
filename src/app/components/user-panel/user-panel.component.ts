import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  constructor (private _router: Router) { }

  ngOnInit (): void {
  }

  onLogout (): void {
    localStorage.removeItem('accessToken')
    this._router.navigateByUrl('home/login')
  }
}
