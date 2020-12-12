import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
              private recipeServ: RecipeService,
              private router: Router) { }

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
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // to navigate to a more complex route with the same example
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.recipeServ.deleteRecipe(this.id);
  }

}
