import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);

  cartId: string = '';
  checkOutForm!: FormGroup;
  ngOnInit(): void {
    // this.checkOutForm = new FormGroup({
    //   details: new FormControl(null , [Validators.required]),
    //   phone : new FormControl (null , [Validators.required , Validators.pattern(/^01[0|1|2|5][0-9]{8}$/)]) ,
    //   city : new FormControl(null , [Validators.required])
    // })

    // syntx ابسط عن طريق الformBuilder

    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0|1|2|5][0-9]{8}$/)],
      ],
      city: [null],
    });

    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!; /* الid اللي كنت حاطه في الapp routes */
      },
    });
  }
  submitForm(): void {
    /*  console.log(this.checkOutForm.value) */ //{details , city , phone}
    this.orderService
      .checkOutPaymen(this.cartId, this.checkOutForm.value)
      .subscribe({
        next: (res) => {  
          console.log(res);
          open(res.session.url, '_self')
        },

        error: (err) => {
          console.log(err);
        },
      });
  }
}
