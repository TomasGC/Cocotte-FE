import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { BaseResponse } from 'src/app/classes/base/responses';
import { Ingredients } from 'src/app/classes/ingredients/ingredients';
import { ListIngredientsResponse } from 'src/app/classes/ingredients/responses';

import { IngredientInfos, IngredientUnits, Recipes, RecipeTypes, Seasons } from 'src/app/classes/recipes/recipes';
import { IsEmpty } from 'src/app/classes/tools';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  Recipes = Recipes;
  isCreation: boolean;
  recipeTypes = Object.keys(RecipeTypes);
  seasons = Object.keys(Seasons);
  ingredientUnits = Object.keys(IngredientUnits);
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'delete'];
  recipe = this.data;
  dataSource = new MatTableDataSource(this.recipe.ingredients);
  ingredients: Array<Ingredients>;
  loading: boolean = true;

  // Translations with variables.
  timesCooked: string;
  lastCooked: string;

  constructor(private translate: TranslateService,
    private ingredientsService: IngredientsService,
    private recipesService: RecipesService,
    public dialogRef: MatDialogRef<RecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipes) {  }

  ngOnInit() {
    this.isCreation = this.recipe._id == null;
    this.recipeTypes = this.recipeTypes.slice(this.recipeTypes.length / 2);
    this.seasons = this.seasons.slice(this.seasons.length / 2);
    this.ingredientUnits = this.ingredientUnits.slice(this.ingredientUnits.length / 2);
    this.loading = true;

    this.ingredientsService.List().subscribe(
      data => {
        let response = Object.assign(new ListIngredientsResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while gathering all the ingredients.' + response.message);
          return;
        }

        this.ingredients = response.ingredients;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('List all ingredients not succeeded.');
      });

      this.timesCooked = this.translate.instant('week.dialogs.recipes.timesCooked', { number: IsEmpty(this.recipe.timesCooked) ? 0 : this.recipe.timesCooked });
      this.lastCooked = this.translate.instant('week.dialogs.recipes.lastCooked', { date: this.recipe.lastCooked });
  }

  AddIngredient(): void {
    if (this.recipe.ingredients === undefined || IsEmpty(this.recipe.ingredients) || this.recipe.ingredients.length == 0 || this.recipe.ingredients.find(x => IsEmpty(x._id) || IsEmpty(x.quantity)) != null)
      this.recipe.ingredients = new Array<IngredientInfos>();

    this.recipe.ingredients.push(new IngredientInfos());
    this.dataSource.data = this.recipe.ingredients;
  }

  ChangeIngredient(index, value: Ingredients): void {
    this.recipe.ingredients[index] = new IngredientInfos(value._id, null, null, value)
  }

  RemoveIngredient(index): void {
    this.recipe.ingredients.splice(index, 1);
    this.dataSource.data = this.recipe.ingredients;
  }

  ObjectComparisonFunction(option, value): boolean {
    return option._id === value._id;
  }

  Close(): void {
    this.dialogRef.close(false);
  }

  IsValid(): boolean {
    if (IsEmpty(this.recipe.name))
      return false;

    if (typeof(this.recipe.type) === undefined || this.recipe.type == null)
      return false;

    if (this.recipe.ingredients === undefined || IsEmpty(this.recipe.bestSeasons) || this.recipe.ingredients.length == 0)
      return false;

    if (this.recipe.ingredients === undefined || IsEmpty(this.recipe.ingredients) || this.recipe.ingredients.length == 0 || this.recipe.ingredients.find(x => IsEmpty(x._id) || IsEmpty(x.quantity) || (x.unit === undefined || x.unit == null)) != null)
      return false;

    return true;
  }

  Validate(): void {
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
}

