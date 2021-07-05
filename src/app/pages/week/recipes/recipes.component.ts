import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/classes/base/responses';
import { Ingredients } from 'src/app/classes/ingredients/ingredients';
import { ListIngredientsResponse } from 'src/app/classes/ingredients/responses';

import { Recipes, RecipeType, Season } from 'src/app/classes/recipes/recipes';
import { IsEmpty } from 'src/app/classes/tools';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  isCreation: boolean;
  recipeTypes = Object.keys(RecipeType);
  seasons = Object.keys(Season);
  displayedColumns: string[] = ['name', 'quantity', 'delete'];
  recipe = { ...this.data };
  dataSource = new MatTableDataSource(this.recipe.ingredients);
  ingredients: Array<Ingredients>;
  loading: boolean = true;

  constructor(private ingredientsService: IngredientsService,
    private recipesService: RecipesService,
    public dialogRef: MatDialogRef<RecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipes) {
      this.isCreation = this.recipe._id == null;
      this.recipeTypes = this.recipeTypes.slice(this.recipeTypes.length / 2);
      this.seasons = this.seasons.slice(this.seasons.length / 2);
      this.loading = true;

      this.ingredientsService.List().subscribe(
        data => {
          let response = Object.assign(new ListIngredientsResponse(), data);
          if(!response.success) {
            console.error('Something went wrong while getting all the ingredients.' + response.message);
            return;
          }

          this.ingredients = response.ingredients;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.error('List all ingredients not succeeded.');
        });
  }

  AddIngredient(): void {
    this.recipe.ingredientIds.push({key: "0", value: 0});
    this.recipe.ingredients.push(new Ingredients());
    this.dataSource.data = this.recipe.ingredients;
  }

  ChangeIngredient(index, value: Ingredients): void {
    this.recipe.ingredients[index] = new Ingredients(value._id, value.name, value.basePrice, value.baseQuantity, value.quantities, value.unit, value.userId, value.selectedQuantity)
  }

  RemoveIngredient(index): void {
    this.recipe.ingredientIds.splice(index, 1);
    this.recipe.ingredients.splice(index, 1);
    this.dataSource.data = this.recipe.ingredients;
  }

  ObjectComparisonFunction(option, value): boolean {
    return option.name === value.name && option._id === value._id;
  }

  Close(): void {
    this.recipe = this.data;
    this.dialogRef.close(false);
  }

  IsValid(): boolean {
    if (IsEmpty(this.recipe.name))
      return false;

    if (typeof(this.recipe.type) === undefined || this.recipe.type == null)
      return false;

    if (IsEmpty(this.recipe.seasons))
      return false;

    if (this.recipe.ingredients === undefined || IsEmpty(this.recipe.ingredients) || this.recipe.ingredients.length == 0 || this.recipe.ingredients.find(x => IsEmpty(x.name) || IsEmpty(x.selectedQuantity)) != null)
      return false;

    return true;
  }

  Validate(): void {
    for (let i = 0; i < this.recipe.ingredients.length; ++i){
      this.recipe.ingredientIds[i].key = this.recipe.ingredients[i]._id;
      this.recipe.ingredientIds[i].value = this.recipe.ingredients[i].selectedQuantity;
    }

    if (this.isCreation){
      this.recipesService.Create(this.recipe).subscribe(
        data => {
          let response = Object.assign(new BaseResponse(), data);
          if(!response.success) {
            console.error('Something went wrong during recipe creation.');
            return;
          }

          console.log('Recipe created.');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Recipe not created.');
        });
    }
    else{
      this.recipesService.Update(this.recipe).subscribe(
        data => {
          let response = Object.assign(new BaseResponse(), data);
          if(!response.success) {
            console.error('Something went wrong during recipe update.');
            return;
          }

          console.log('Recipe updated.');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Recipe not updated.');
        });
    }
  }

  ngOnInit() {
  }

}
