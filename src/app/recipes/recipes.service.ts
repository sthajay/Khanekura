import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
    constructor(private shoppingService: ShoppingListService) { }

    // recipeEmitter = new EventEmitter<Recipe>();

    //subject is better
    recipeSubject = new Subject<Recipe[]>();


    // private recipes: Recipe[] = [
    //     new Recipe('Beef', 'Dami xa la', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Onion', 10),
    //             new Ingredient('Oil', 10),
    //             new Ingredient('Meat Masala', 1),
    //         ]),
    //     new Recipe('Tasty Schnitzel', 'A Super-tasty Schnitzel - just awesome', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 10),

    //         ]),
    //     new Recipe('Big fat Burger', 'What else you want to say?', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Veggies', 10),

    //         ]),



    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.emitFunction();
    }


    getRecipes(): Recipe[] {
        //return a copy of recipes only
        return this.recipes.slice();
    }

    getRecipeByIndex(index: number): Recipe {
        return this.recipes[index];
    }

    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredientsDirectly(ingredients);

    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.emitFunction();
    }

    updateRecipe(index: number, recipe: Recipe): void {
        this.recipes[index] = recipe;
        this.emitFunction();

    }

    emitFunction(): void {
        this.recipeSubject.next(this.recipes.slice());
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.emitFunction();
    }

}