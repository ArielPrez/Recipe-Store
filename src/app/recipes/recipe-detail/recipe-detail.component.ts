import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeServ: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeServ.getRecipe(this.id);
      }
    );
  }
  onClickAddShoppingList() {
    // Passing the array of ingredients directly to ShoppingListService,
    // calling his method addManyIngredients
    this.slService.addManyIngredients(this.recipe.ingredients);
  }

}
