import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  /*x:FormGroup = new FormGroup({
  name: new FormControl(null),
  password : new FormControl(null),

});*/ //{}

  isLoading: boolean = false;

  msgError: string = '';

  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  /* another method to create form */
 /*  private readonly _formBuilder = inject(FormBuilder);
  registerForm: FormGroup = this._formBuilder.group({
    name: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z0-9]{0,7}$/),
    ]],
    rePassword: [null, [Validators.required]],
    phone: [null, [
      Validators.required,
      Validators.pattern(/^01[0|1|2|5][0-9]{8}$/),
    ]],
  } , {validator : this.confirmPassword});
 */ 
  // -----------------------------------------------------------------------------------------------
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][A-Za-z0-9]{0,7}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0|1|2|5][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword } /* custom validation */
  );

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authservice.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = true;
          this.router.navigate(['/login']);
        },

        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;

          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched;
    }

    this.registerForm.reset();
  }

  // valdators ---> methods validotrs

  confirmPassword(group: AbstractControl) /*custome validrtors*/ {
    // password
    // rePAssword
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (password === rePassword) {
      return null; //no errors;
    } else {
      return { mismatch: true };
    }
  }
}
