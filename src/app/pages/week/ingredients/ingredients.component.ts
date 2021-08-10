import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { BaseResponse } from 'src/app/classes/base/responses';
import { IngredientPrices } from 'src/app/classes/ingredients/ingredientPrices';

import { IngredientCategories, IngredientPriceUnits, Ingredients } from 'src/app/classes/ingredients/ingredients';
import { IsEmpty } from 'src/app/classes/tools';
import { LanguageTypes } from 'src/app/classes/users/users';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})

export class IngredientsComponent implements OnInit {
  Ingredients = Ingredients;
  isCreation: boolean;

  priceUnits = Object.keys(IngredientPriceUnits);
  categories = Object.keys(IngredientCategories);
  displayedColumns: string[] = ['quantity', 'delete'];
  ingredient = this.data;

  userLanguage: LanguageTypes;

  constructor(private ingredientsService: IngredientsService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<IngredientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredients) {  }

  ngOnInit() {
    this.isCreation = this.ingredient._id == null;
    this.userLanguage = LanguageTypes[this.cookieService.get('language')];
    this.priceUnits = this.priceUnits.slice(this.priceUnits.length / 2);
    this.categories = this.categories.slice(this.categories.length / 2);

    if (IsEmpty(this.ingredient.price)){
      this.ingredient.price = new IngredientPrices();
      this.ingredient.price.basePrice = 0;
    }
  }

  ObjectComparisonFunction(option, value): boolean {
    return option.mainValue === value.mainValue && option._id === value._id;
  }

  Close(): void {
    this.ingredient = this.data;
    this.dialogRef.close(false);
  }

  IsValid(): boolean {
    if (IsEmpty(this.ingredient.name))
      return false;
    if (IsEmpty(this.ingredient.price || IsEmpty(this.ingredient.price.basePrice)))
      return false;
    if (typeof(this.ingredient.priceUnit) == "undefined" || this.ingredient.priceUnit == null)
      return false;
    if (IsEmpty(this.ingredient.categories) || this.ingredient.categories.length == 0 || this.ingredient.categories.find(x => IsEmpty(x)) != null)
      return false;

    return true;
  }

  Validate(): void {
    if (this.isCreation){
      this.ingredientsService.Create(this.ingredient).subscribe(
        data => {
          let response = Object.assign(new BaseResponse(), data);
          if(!response.success) {
            console.error('Something went wrong during ingredient creation.');
            return;
          }

          console.log('Ingredient created.');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Ingredient not created.');
        });
    }
    else{
      this.ingredientsService.Update(this.ingredient).subscribe(
        data => {
          let response = Object.assign(new BaseResponse(), data);
          if(!response.success) {
            console.error('Something went wrong during ingredient update.');
            return;
          }

          console.log('Ingredient updated.');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Ingredient not updated.');
        });
    }
  }
}
