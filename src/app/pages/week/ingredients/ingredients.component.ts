import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { BaseResponse } from 'src/app/classes/base/responses';
import { DataConfig, DataConfigType, LanguageType } from 'src/app/classes/configuration/dataConfig';
import { GetDataConfigsResponse } from 'src/app/classes/configuration/responses';

import { Ingredients } from 'src/app/classes/ingredients/ingredients';
import { IsEmpty } from 'src/app/classes/tools';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})

export class IngredientsComponent implements OnInit {
  Ingredients = Ingredients;
  isCreation: boolean;

  units: DataConfig[];
  types: DataConfig[];
  displayedColumns: string[] = ['quantity', 'delete'];
  ingredient = this.data;
  dataSource = new MatTableDataSource(this.ingredient.quantities);

  userLanguage: LanguageType;

  constructor(private ingredientsService: IngredientsService,
    private configurationService: ConfigurationService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<IngredientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredients) {  }

  ngOnInit() {
    this.isCreation = this.ingredient._id == null;
    this.userLanguage = LanguageType[this.cookieService.get('language')];

    this.configurationService.GetDataConfigs(DataConfigType.IngredientUnit).subscribe(
      data => {
        let response = Object.assign(new GetDataConfigsResponse(), data);
        if(!response.success) {
          // this.loading = false;
          console.error('Something went wrong while the data configs of IngredientUnit kind.' + response.message);
          return;
        }

        this.units = response.dataConfigs;
        // this.loading = false;
      },
      error => {
        // this.loading = false;
        console.error('List all ingredients not succeeded.');
      });

      this.configurationService.GetDataConfigs(DataConfigType.IngredientType).subscribe(
        data => {
          let response = Object.assign(new GetDataConfigsResponse(), data);
          if(!response.success) {
            // this.loading = false;
            console.error('Something went wrong while getting the data configs of IngredientType kind.' + response.message);
            return;
          }

          this.types = response.dataConfigs;

          // this.loading = false;
        },
        error => {
          // this.loading = false;
          console.error('List all ingredients not succeeded.');
        });
  }


  AddQuantity(): void {
    if (IsEmpty(this.ingredient.quantities) || this.ingredient.quantities.length == 0 || this.ingredient.quantities.find(x => IsEmpty(x)) != null)
      this.ingredient.quantities = new Array<number>();

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
    if (typeof(this.ingredient.type) == "undefined" || this.ingredient.type == null)
      return false;
    if (IsEmpty(this.ingredient.quantities) || this.ingredient.quantities.length == 0 || this.ingredient.quantities.find(x => IsEmpty(x)) != null)
      return false;

    return true;
  }

  Validate(): void {
    this.ingredient.unitId = this.ingredient.unit._id;
    this.ingredient.typeId = this.ingredient.type._id;

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
