import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private shoppingSubscription: Subscription;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();

    this.shoppingSubscription = this.shoppingService.ingredientEmitter
      .subscribe((allIngredients: Ingredient[]) => { this.ingredients = allIngredients });
  }


  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();

  }

  onEditClick(index: number) {
    this.shoppingService.editIndexSubject.next(index);
  }
}
