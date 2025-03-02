import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin=input<boolean>(true)

  private readonly _AuthService = inject(AuthService)

  exit():void{
    this._AuthService.logout()
  }
}
