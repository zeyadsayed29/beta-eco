import { BrandService } from './../../core/services/categories/brand/brand.service';
import { IBrands } from './../../shared/interfaces/ibrands';
import { Component, inject, OnInit } from '@angular/core';  

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brand= inject(BrandService)
  brands:IBrands[]= []

  getbrands():void{
    this.brand.getAllBrands().subscribe({
      next:(res)=>{
      this.brands = res.data
      },

      error:(err)=>{
        console.log(err)
      }
    })
  }
ngOnInit(): void {
  this.getbrands()
}
}
