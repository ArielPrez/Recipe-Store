import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recName = '';
    let recImgPath = '';
    let recDescrip = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recName = recipe.name;
      recImgPath = recipe.imagePath;
      recDescrip = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recName),
      'imgPath': new FormControl(recImgPath),
      'description': new FormControl(recDescrip)
    });
  }

}
