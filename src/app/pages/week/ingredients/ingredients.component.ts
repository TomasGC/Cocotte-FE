import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/classes/base/responses';

import { Ingredients, IngredientUnit } from 'src/app/classes/ingredients/ingredients';
import { IsEmpty } from 'src/app/classes/tools';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})

export class IngredientsComponent implements OnInit {
  isCreation: boolean;
  enumKeys: string[] = Object.keys(IngredientUnit);
  displayedColumns: string[] = ['quantity', 'delete'];
  ingredient = { ...this.data };
  dataSource = new MatTableDataSource(this.ingredient.quantities);

  constructor(private ingredientsService: IngredientsService,
    public dialogRef: MatDialogRef<IngredientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredients) {
      this.isCreation = this.ingredient._id == null;
      this.enumKeys = this.enumKeys.slice(this.enumKeys.length / 2);
  }

  AddQuantity(): void {
    this.ingredient.quantities.push(0);
    this.dataSource.data = this.ingredient.quantities;
  }

  RemoveQuantity(index): void {
    this.ingredient.quantities.splice(index, 1);
    this.dataSource.data = this.ingredient.quantities;
  }

  Close(): void {
    this.ingredient = this.data;
    this.dialogRef.close(false);
  }

  IsValid(): boolean {
    if (IsEmpty(this.ingredient.name))
      return false;
    if (IsEmpty(this.ingredient.basePrice))
      return false;
    if (IsEmpty(this.ingredient.baseQuantity))
      return false;
    if (typeof(this.ingredient.unit) == "undefined" || this.ingredient.unit == null)
      return false;
    if (IsEmpty(this.ingredient.quantities) || this.ingredient.quantities.length == 0 || this.ingredient.quantities.find(x => IsEmpty(x)) != null)
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

  ngOnInit() {
  }
}
