import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const userStorage: User = authService.get('USER_CREDENTIALS')
  const router = inject(Router)
  if (userStorage && userStorage.userName) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }


};
