import { Icategories } from './../../shared/interfaces/icategories';
import { Category } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  category: Icategories[] = [];


  getcat():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.category = res.data;

      },

      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getcat()
  }

}
