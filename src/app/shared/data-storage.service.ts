import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipesService, private authService: AuthService) { }

  // routes = 'https://ng-course-recipe-book-dec3a.firebaseio.com/';

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    //recipes folder banauxa tesle ani .json chae halnae parxa yo firebase ko lagi
    this.http.put('https://ng-course-recipe-book-dec3a.firebaseio.com/recipes.json', recipes)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

  fetchRecipes() {
    //esari garda ni hunxa 

    // this.http.get('https://ng-course-recipe-book-dec3a.firebaseio.com/recipes.json').subscribe(
    //  ( recipes: Recipe[] )=> {
    //     this.recipeService.setRecipes(recipes);
    //   }
    // );

    //or esari garda ni hunxa
    // return this.http.get<Recipe[]>('https://ng-course-recipe-book-dec3a.firebaseio.com/recipes.json')
    //   .pipe(
    //     map(recipes => {
    //       return recipes.map(recipe => {
    //         return {
    //           ...recipe,
    //           ingredient: recipe.ingredient ? recipe.ingredient : []
    //         };
    //       });
    //     }),
    //     tap(
    //       recipes => {
    //         this.recipeService.setRecipes(recipes);
    //       }
    //     )
    //   );

    //subject ra http dui otae milera euta observable falnu paryo
    //user ma vako token use garera recipes fetch garna parxa so esari garnu parxa using exhaust map

    return this.http.get<Recipe[]>('https://ng-course-recipe-book-dec3a.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredient: recipe.ingredient ? recipe.ingredient : []
            };
          });
        }),
        tap(
          recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );

  }
}
