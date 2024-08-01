import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(ApiService)
  const route = inject(Router)

  if (auth.isLoggedIn()) {
    return true;
  } else {
    alert("Please Login")
    route.navigateByUrl('')
    return false
  }
};
