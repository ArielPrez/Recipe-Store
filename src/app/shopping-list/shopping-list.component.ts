import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredientsComp: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // This method return a copy of the array of Ingredients,
    // and it save it to list it.
    this.ingredientsComp = this.shoppingListService.getIngredients();
    // This method will return the Array ingredients when a new ingredient has been added.
    // and it save it to list it.
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredientsComp = ingredients;
      }
    );
  }



}
