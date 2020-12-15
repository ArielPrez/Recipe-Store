import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() idRoute: number;
  // img: string;
  // private recipeSub: Subscription;
  // recipeMod: Recipe;


  ngOnInit(): void {
        // this.recipeSub = this.recipeService.recipesChanged.subscribe(
        //   (recipeComp: Recipe[]) => {
        //     console.log(recipeComp[this.idRoute].imagePath + 'quiero ver que hay aqui!!!' + this.idRoute);
        //     this.img = recipeComp[this.idRoute].imagePath.toString();
        //   }
        //   );
    // this.img = this.recipe.imagePath;
        // console.log('| recipe| ' + this.recipe.imagePath);
        // this.img = this.recipeMod.imagePath;
    }

}
