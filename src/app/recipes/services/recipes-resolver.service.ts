import { RecipeService } from './recipe.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Recipe } from './../recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (!recipes.length) {
      return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
