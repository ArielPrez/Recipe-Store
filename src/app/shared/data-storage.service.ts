import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<Recipe[]>('https://recipe-store-book-default-rtdb.firebaseio.com/recipe.json')
    .subscribe((recipes) => {
      // console.log('Fetched: => ');
      // console.log(recipes);
      this.recipeService.setRecipes(recipes);
    });
  }
}
