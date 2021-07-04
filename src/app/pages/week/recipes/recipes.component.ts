import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/classes/base/responses';
import { Ingredients } from 'src/app/classes/ingredients/ingredients';

import { Recipes, RecipeType, Season } from 'src/app/classes/recipes/recipes';
import { IsEmpty } from 'src/app/classes/tools';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  isCreation: boolean;
  recipeTypes = Object.values(RecipeType);
  seasons = Object.values(Season);
  displayedColumns: string[] = ['quantity', 'delete'];
  recipe = { ...this.data };
  dataSource = new MatTableDataSource(this.recipe.ingredientIds);

  constructor(private recipesService: RecipesService,
    public dialogRef: MatDialogRef<RecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipes,
    public dialog: MatDialog) {
  }

  AddIngredient(): void {

  }

  Close(): void {
    this.recipe = this.data;
    this.dialogRef.close(this.recipe);
  }

  IsValid(): boolean {
    if (IsEmpty(this.recipe.name))
      return false;

    return true;
  }

  Validate(): void {
    this.dialogRef.close(this.recipe);
    // if (this.isCreation){
    //   this.recipesService.Create(this.recipe).subscribe(
    //     data => {
    //       let response = Object.assign(new BaseResponse(), data);
    //       if(!response.success) {
    //         console.error('Something went wrong during recipe creation.');
    //         return;
    //       }

    //       console.log('Recipe created.');
    //       this.dialogRef.close(this.recipe);
    //     },
    //     error => {
    //       console.error('Recipe not created.');
    //     });
    // }
    // else{
    //   this.recipesService.Update(this.recipe).subscribe(
    //     data => {
    //       let response = Object.assign(new BaseResponse(), data);
    //       if(!response.success) {
    //         console.error('Something went wrong during recipe update.');
    //         return;
    //       }

    //       console.log('Recipe updated.');
    //       this.dialogRef.close(this.recipe);
    //     },
    //     error => {
    //       console.error('Recipe not updated.');
    //     });
    // }
  }

  ngOnInit() {
  }

}
