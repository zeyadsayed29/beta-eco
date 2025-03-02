import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { NgIf, NgFor } from '@angular/common'; 
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true, // لازم يكون Standalone Component عشان يشتغل @for
  imports: [], // إضافة NgIf و NgFor للـ Imports
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private readonly wishlistService: WishlistService) {}

  private readonly addcarto = inject(CartService)
    private readonly toastrService = inject(ToastrService)
  product: Iproduct[] = [];

  ngOnInit(): void {
    this.getUserWishlist(); // 
  }

  getUserWishlist(): void {
    this.wishlistService.getUserLoggedwishlist().subscribe({
      next: (res) => {
        console.log('Wishlist Data:', res.data);
        this.product = res.data; // 
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }

  removeProductFrom(id: string): void {
    console.log('Function removeProductFrom called with ID:', id); 
  
    this.wishlistService.removeProductFromwishlist(id).subscribe({
      next: (res) => {
        console.log('Removed:', res); 
        this.product = this.product.filter((p) => p._id !== id);
        this.toastrService.success('Product removed successfully');
      },
      error: (err) => {
        console.error('Error removing product:', err)
        this.toastrService.error('Failed to remove product');
      }
    });
  }
  
  addToCart(id: string): void {
    this.addcarto.addProductToCart(id).subscribe({
      next: (res) => {
        console.log('Added to cart successfully:', res);
        this.toastrService.success(res.message)
      },
      error: (err) => {
        console.error(' Error adding to cart:', err);
      }
    });
  }
  
  
}
