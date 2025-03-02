import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { error } from 'console';
import { Iproduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  detailsProduct:Iproduct | null = null /* أو احط علامة تعجب */

  ngOnInit(): void {
    this._ActivatedRoute.paramMap /* return observable بتجيب كل البيانات اللي في url */
      .subscribe({
        next: (p) => {
          let idProduct = p.get(
            'id' /* لازم تكون شبه الكلمة اللي مكتوبة في الأمتداد في ملف app routes */
          );

          // call api --------call api specific product بعد ما الid بقى موجود

          this._ProductsService.getAllSpeceficProducts(idProduct).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.detailsProduct=res.data; //اتحولت من null ل object
            },

            error:(err)=>{
              console.log(err)
            }
          });
        },
      });
  }
}
