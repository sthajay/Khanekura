import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


//routes kasari auxa vanera mathi tala lekhnu parxa afaele. Edi new lae tala rakhyo vane /recipes/new 
//ma error auxa kina vane esle new lae id bujxa

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipeStartComponent },    //recipes/       ma yo auxa
      { path: 'new', component: EditRecipeComponent },      //recipes/new
      { path: ':id', component: RecipeDetailsComponent, resolve: [RecipeResolverService] },   //recipes/id  esto auxa
      { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipeResolverService] },   //recipes/id/edit
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/recipes' }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}