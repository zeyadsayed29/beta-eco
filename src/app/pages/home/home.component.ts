import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { CartService } from './../../core/services/cart/cart.service';
import { SalePipe } from './../../shared/pipes/sale.pipe';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TermTextPipe } from '../../shared/pipes/term-text.pipe';
import { FilterationPipe } from '../../shared/pipes/filteration.pipe';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  standalone: true, // ضروري عند استخدام imports
  imports: [CarouselModule, RouterLink , SalePipe  , TermTextPipe], // استخدام RouterLink مباشرةً
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartservice = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
  };
  

  product: Iproduct[] = [];
  categories: Icategories[] = [];
  


  getProductData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.product = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  getCategoreyData(): void {
    this.ngxSpinnerService.show('main')
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;

        this.ngxSpinnerService.hide('main')
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  ngOnInit(): void {
    this.getProductData();
    this.getCategoreyData();
  }

  addToCart(id:string):void{
    this.cartservice.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.success(res.message)
      },

      error:(err)=>{
        console.log(err)
      }
    })

  }

  addProductToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
