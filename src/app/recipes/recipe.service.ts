import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
          'Arroz con pollo a la chorrera',
          // tslint:disable-next-line: max-line-length
          'Otro plato muy concurrido en las mesas de la isla es el arroz con pollo, es muy común servirlo acompañado de plátano frito o pan, se sirve bien caliente, y es plato principal por excelencia, he aquí la receta para que hagas de tus celebraciones un festín muy cubano',
          'https://www.cocina-cubana.com/base/stock/Recipe/83-image/83-image_web.jpg'
          ),
          new Recipe(
            'Ajiaco Cubano',
            // tslint:disable-next-line: max-line-length
            'El ajiaco es un platillo nacional que se gestó durante por lo menos trescientos años de historia. Se consolidó en comida nacional hasta después de las primeras guerras importantes en cuba. La receta comenzó siendo una especie de cocido en el que se agregaba a la olla toda clase de ingredientes de origen vegetal y animal procedentes de las tres culturas, la europea, la africana y la autóctona, que se amalgaman en la gastronomía cubana.',
            'https://www.cocina-cubana.com/base/stock/Recipe/2-image/2-image_web.jpg'
            )
      ];

    //  Return a new array which is an exact copy of the one in this service file (Array=> recipes)
    getRecipe() {
        return this.recipes.slice();
    }
}
