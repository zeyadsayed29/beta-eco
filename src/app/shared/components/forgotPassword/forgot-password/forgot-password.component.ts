import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

step:number = 1;

  verifyEmail:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email])
  })


  verifyCode:FormGroup = new FormGroup({
    resetCode : new FormControl(null , [Validators.required , Validators.pattern(/^\d{6}$/
    )])
  })


  resetPassword:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email]) ,
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z0-9]{0,7}$/),
    ])
  })

  verifyEmailSubmit():void{
    this._AuthService.setEmailverify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statuMsg ==='success'){
          this.step=2
        }
      },

      error:(err)=>{
        console.log(err)
      }
    })

  }

  verifyCodeSubmit():void{
    this._AuthService.setCodeverify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status ==='Success'){
          this.step=3
        }
      },

      error:(err)=>{
        console.log(err)
      }
    })

  }

  resetPasswordSubmit():void{
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
       localStorage.setItem('ueseToken' , res.token);
    this._Router.navigate(['/home'])  }, 

      error:(err)=>{
        console.log(err)
      }
    })

  }


}
