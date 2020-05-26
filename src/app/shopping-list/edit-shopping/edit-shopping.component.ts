import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-shopping',
  templateUrl: './edit-shopping.component.html',
  styleUrls: ['./edit-shopping.component.css']
})
export class EditShoppingComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) myForm: NgForm;
  editMode: boolean = false;
  subscription: Subscription;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.editIndexSubject
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingService.getIngredientByIndex(index);
          this.myForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );

  }

  onAddBtnClick(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {

      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }

  onClear(): void {
    this.myForm.reset();
    this.editMode = false;

  }
  onDelete(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
