import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('tazas de whatever', 6),
        new Ingredient('libra de loque sea', 3),
      ];

    getIngredients() {
        // Return a copy of the Array ingredients, without parameters inside, the method returns all.
        return this.ingredients.slice();
    }
    getIngredient(index: number) {
      return this.ingredients[index];
    }
    addIngredient(ingredient: Ingredient) {
        // Save the new ingredient.
        this.ingredients.push(ingredient);
        // Emit a copy of the Array ingredients
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addManyIngredients(ingredientsArray: Ingredient[]) {
        // Save the new array of ingredients, pushing all ingredients one by one with the (...) method.
        this.ingredients.push(...ingredientsArray);
        this.ingredientsChanged.next(this.ingredients.slice());
        // Save all ingredients one by one with a loop.
            // for (let iterator of ingredientsArray) {
            //     this.addIngredient(iterator);
            // }
    }

    updateIngrediente(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
}
