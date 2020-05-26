import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // ingredientEmitter = new EventEmitter<Ingredient[]>();
  //subject is better than EventEmitter
  ingredientEmitter = new Subject<Ingredient[]>();
  editIndexSubject = new Subject<number>();

  constructor() { }

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 2),
    new Ingredient('Mango', 2),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
    //Direct eti gare observable banaunu pardaina ingredients lae ani direct original mae kam hunxa
    //    return this.ingredients;
  }

  getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.emitFunction();
  }
  emitFunction() {

    // this.ingredientEmitter.emit(this.ingredients.slice());
    this.ingredientEmitter.next(this.ingredients.slice());
  }
  addIngredient(ingredient: Ingredient) {
    // console.log(ingredient);
    this.ingredients.push(ingredient);
    this.emitFunction();
    // console.log(this.ingredients);

  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emitFunction();

  }

  addIngredientsDirectly(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.emitFunction();


  }

}
