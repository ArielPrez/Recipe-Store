import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable({providedIn: 'root'})
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
          'Arroz con pollo a la chorrera',
          // tslint:disable-next-line: max-line-length
          'Otro plato muy concurrido en las mesas de la isla es el arroz con pollo, es muy común servirlo acompañado de plátano frito o pan, se sirve bien caliente, y es plato principal por excelencia, he aquí la receta para que hagas de tus celebraciones un festín muy cubano',
          'https://www.cocina-cubana.com/base/stock/Recipe/83-image/83-image_web.jpg',
          [
            new Ingredient('libra de arroz', 2),
            new Ingredient('porciones de pollo', 4),
            new Ingredient('cucharadas de aceite', 2),
            new Ingredient('cebollas', 2),
            new Ingredient('ramita de perejil', 1),
            new Ingredient('ají grande', 1),
            new Ingredient('dientes de ajo', 2),
            new Ingredient('tomates pequeños', 5),
            new Ingredient('taza de vino seco', 1),
            new Ingredient('cucharadita de sal', 1),
            new Ingredient('tazas de caldo (cuadritos)', 6),
            new Ingredient('cucharadita de colorante', 1),
            new Ingredient('cucharadita de comino molido', 0.5),
            new Ingredient('cucharadita de pimienta molida', 0.75),
            new Ingredient('pimientos asados', 3),
            new Ingredient('cerveza', 1),
            new Ingredient('limón verde', 1),
            new Ingredient('taza de petit-pois (opcional', 1)
          ]),
        new Recipe(
          'Ajiaco Cubano',
          // tslint:disable-next-line: max-line-length
          'El ajiaco es un platillo nacional que se gestó durante por lo menos trescientos años de historia. Se consolidó en comida nacional hasta después de las primeras guerras importantes en cuba. La receta comenzó siendo una especie de cocido en el que se agregaba a la olla toda clase de ingredientes de origen vegetal y animal procedentes de las tres culturas, la europea, la africana y la autóctona, que se amalgaman en la gastronomía cubana.',
          'https://www.cocina-cubana.com/base/stock/Recipe/2-image/2-image_web.jpg',
          [
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
          ])
      ];

    constructor(private shoppingListService: ShoppingListService) {}

    //  Return a new array which is an exact copy of the one in this service file (Array=> recipes)
    getRecipes() {
        return this.recipes.slice();
    }
    // Passing the array of ingredients to ShoppingListService,
    // calling his method addManyIngredients.
    // addIngredientToShoppingList(ingredient: Ingredient[]) {
    //   this.shoppingListService.addManyIngredients(ingredient);
    // }
    getRecipe(id: number) {
      return this.recipes[id];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addManyIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
