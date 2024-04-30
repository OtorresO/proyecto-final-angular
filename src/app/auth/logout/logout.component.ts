import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private authService = inject(AuthService)
  private router = inject(Router)
  logout(){
    this.authService.destroySession('USER_CREDENTIALS')
    this.router.navigate(['/login'])
  }
}
