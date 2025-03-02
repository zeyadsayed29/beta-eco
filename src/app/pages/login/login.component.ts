import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading:boolean = false
  
  msgError:string=''
  
    private readonly authservice = inject(AuthService);
    private readonly router=inject(Router)
  
    loginForm: FormGroup = new FormGroup(
      {
       
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-Z][A-Za-z0-9]{0,7}$/),
        ]),

      },
     /* custom validation */
    );
  
    submitForm(): void {
  if(this.loginForm.valid){
  
    this.isLoading = true
    this.authservice.sendLoginForm(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = true
// 1- save token
        localStorage.setItem('userToken' , res.token);
        // 2- decode token 
        this.authservice.saveUserData()

// 3- navigate to home
        this.router.navigate(['/home'])



      },
  
      error: (err) => {
        console.log(err);
       this.msgError= err.error.message
        
  
        this.isLoading=false
      },
    });
  }
  
      this.loginForm.reset();
    }
  
    // valdators ---> methods validotrs
  

  }
  

