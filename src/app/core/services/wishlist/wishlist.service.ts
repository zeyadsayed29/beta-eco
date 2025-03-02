import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {}

  myToken: any = localStorage.getItem('userToken');

  addProductToWishlist(id: string): Observable<any> {
    console.log('Sending request to API with ID:', id);
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      { headers: { token: this.myToken! } }
    );
  }
  

  removeProductFromwishlist(id: string): Observable<any> {
    const token = localStorage.getItem('userToken'); // ✅ اجلب التوكن وقت الطلب
  
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: { token: token! } //
      }
    );
  }

  getUserLoggedwishlist(): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers: {
          token: this.myToken! /* هحتاجه جلوبال */,
        },
      }
    );
  }
}
