import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('tazas de agua', 6),
        new Ingredient('libra de carne de puerco cortada en trozos', 1),
        new Ingredient('libra de polio cortado en trozos', 0.5),
        new Ingredient('libra de ñame', 0.5),
        new Ingredient('libra de boniato', 1),
        new Ingredient('libra de yuca', 1),
        new Ingredient('trozo de calabaza', 1),
        new Ingredient('plátanos machos', 2),
        new Ingredient('plátano verde', 1),
        new Ingredient('libra de malanga', 1),
        new Ingredient('taza de tomate molido', 1),
        new Ingredient('ají grande', 1),
        new Ingredient('dientes de ajo', 4),
        new Ingredient('cebolla picada', 1)
      ];

    getIngredients() {
        // Return a copy of the Array ingredients, without parameters inside, the method returns all.
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient) {
        // Save the new ingredient.
        this.ingredients.push(ingredient);
        // Emit a copy of the Array ingredients
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
