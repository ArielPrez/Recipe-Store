import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredientQuantity = new Promise(
    (resolve, reject) => {
      setTimeout(
        () => {
          resolve(this.amount);
        }, 2000
      );
    }
  );
  private igChangeSub: Subscription;
  public ingredientsComp: Ingredient[];
  public filterWord: string = '';
  public amount: number = 0;

  constructor(private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    // This method return a copy of the array of Ingredients,
    // and it save it to list it.
    this.ingredientsComp = this.shoppingListService.getIngredients();
    // This method will return the Array ingredients when a new ingredient has been added.
    // and it save it to list it.
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredientsComp = ingredients;
      }
    );
    if (!this.ingredientsComp) {
      // this.filterWord = this.ingredientsComp;
      this.filterWord = '';
    }
    this.ingredientsComp.forEach(
      () => {
        this.amount++;
      }
    );
  }

  public onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
  public onClear() {
    this.filterWord = '';
  }

  public ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
