import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-store-book-default-rtdb.firebaseio.com/recipe.json', recipes)
    .subscribe(
        (response) => {
          console.log('Saved: => ');
          console.log(response);
        }
      );

  }

  fetchRecipes() {
      return this.http.get<Recipe[]>(
        'https://recipe-store-book-default-rtdb.firebaseio.com/recipe.json'
      )
      .pipe(
        map(
          (recipes) => {
            return recipes.map(
              (recipe) => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
              }
            );
          }
        ),
        tap(
          (recipes) => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }
}
