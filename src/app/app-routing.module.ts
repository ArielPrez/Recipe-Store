import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    // { path: 'home', component: AppComponent },
    { path: 'recipes', component: RecipesComponent },
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