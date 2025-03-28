import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

const _router = inject(Router)


  if (localStorage.getItem('userToken') !== null) {
    return true; // المستخدم عنده توكن، يسمح بالدخول
  } 


  else{
    _router.navigate(['/login'])
      /* navigate to login-----router */
  return false; // المستخدم مش عنده توكن، يمنع الدخول
  }

};

