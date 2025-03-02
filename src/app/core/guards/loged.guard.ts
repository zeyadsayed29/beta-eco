import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  
  const _router = inject(Router)
  
  
    if (localStorage.getItem('userToken') !== null) {
      _router.navigate(['/home'])
      return false; // المستخدم عنده توكن، يمنع بالدخول
    } 
  
  
    else{
        /* navigate to login-----router */
    return true; // المستخدم مش عنده توكن، يسمح الدخول
    }
};
