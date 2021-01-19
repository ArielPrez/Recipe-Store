import { RecipesResolverService } from './recipes/services/recipes-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    // { path: 'home', component: AppComponent },
    { path: 'recipes', component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent},
            {
              path: ':id',
              component: RecipeDetailComponent,
              resolve: [RecipesResolverService]
            },
            {
              path: ':id/edit',
              component: RecipeEditComponent,
              resolve: [RecipesResolverService]
            }
        ]
    },
    { path: 'shopping-list', component:  ShoppingListComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // { path: 'not-found', component: PageNotFoundComponent, data{message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
