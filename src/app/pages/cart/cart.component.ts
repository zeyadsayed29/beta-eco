import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../shared/interfaces/icart';
import { subscribe } from 'diagnostics_channel';
import { count, error } from 'console';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartservice = inject(CartService);
    private readonly ngxSpinnerService = inject(NgxSpinnerService)


  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.ngxSpinnerService.show('main')
    this.cartservice.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data); //{totalcartPrice , products[{}]}
        this.cartDetails = res.data;
        this.ngxSpinnerService.hide('main')
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: string): void {
    this.ngxSpinnerService.show('main')
    this.cartservice.removeSpecificCartItem(id).subscribe({
      next:(res) => {
        console.log(res);

        this.ngxSpinnerService.hide('main')
      },

      error:(err) => {
        console.log(err);
      },
    });
  }

updateItem(id:string , count:number):void{
  this.ngxSpinnerService.show('main')
  this.cartservice.updateCartItem(id , count ).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartDetails=res.data
      this.ngxSpinnerService.hide('main')
    },

    error:(err)=>{
      console.log(err)
    }
  })
}
}

