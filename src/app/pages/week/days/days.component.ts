import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/classes/base/responses';

import { Weeks, Day, Meal, MealType } from 'src/app/classes/weeks/weeks';
import { IsEmpty } from 'src/app/classes/tools';
import { WeeksService } from 'src/app/services/weeks/weeks.service';
import { Recipes } from 'src/app/classes/recipes/recipes';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ListRecipesResponse } from 'src/app/classes/recipes/responses';

@Component({
  selector: 'meals',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})

export class DaysComponent implements OnInit {
  Meal = Meal;
  isCreation: boolean;
  displayedColumns: string[] = ['type', 'recipe', 'people', 'buttons', 'price', 'delete'];
  mealTypes = Object.keys(MealType);
  recipes: Array<Recipes>;
  day = this.data;
  loading: boolean = true;
  dataSource = new MatTableDataSource(this.day.meals);

  constructor(private weeksService: WeeksService,
    private recipesService: RecipesService,
    public dialogRef: MatDialogRef<DaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Day) {
      this.mealTypes = this.mealTypes.slice(this.mealTypes.length / 2);
     }

  ngOnInit() {
    this.loading = true;

    this.recipesService.List().subscribe(
      data => {
        let response = Object.assign(new ListRecipesResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while gathering all the recipes.' + response.message);
          return;
        }

        this.recipes = response.recipes;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('List all recipes not succeeded.');
      });
  }

  Plus(index, value): void {
    this.day.meals[index].numberOfPeople += value;
  }

  RemoveItem(index): void {
    let temp = this.dataSource.data;
    temp.splice(index, 1);
    this.dataSource.data = temp;
  }

  AddMeal(): void {
    if (this.day.meals.length >= 3)
      return;

    var meal = new Meal();
    meal.recipe = this.recipes[0];
    meal.numberOfPeople = 2;

    for (var i = 0; i < this.day.meals.length; ++i) {
      if (MealType.Breakfast == this.day.meals[i].type)
        meal.type = MealType.Lunch;
      else if (MealType.Lunch == this.day.meals[i].type)
        meal.type = MealType.Dinner;
      else if (MealType.Dinner == this.day.meals[i].type)
        meal.type = MealType.Breakfast;
    }

    this.day.meals.push(meal);
    this.dataSource.data = this.day.meals;
  }

  ChangeRecipe(index, value: Recipes): void {
    this.day.meals[index].recipe = value;
  }

  ObjectComparisonFunction(option, value): boolean {
    return option.name === value.name && option._id === value._id;
  }

  Close(): void {
    this.dialogRef.close(false);
  }

  IsValid(): boolean {
    if (IsEmpty(this.day.meals) || this.day.meals.length == 0)
      return false;

    if (this.day.meals.length >= 3)
      return false;

    for (var i = 0; i < this.day.meals.length; ++i){
      var meal = this.day.meals[i];
      if (meal.type === undefined || meal.type == null)
        return false;

      if (IsEmpty(meal.numberOfPeople))
        return false;

      if (meal.recipe === undefined || meal.recipe == null)
        return false;
    }

    return true;
  }

  Validate(): void {
    for (var i = 0; i < this.day.meals.length; ++i)
      this.day.meals[i].recipeId = this.day.meals[i].recipe._id;

    this.weeksService.UpdateDay(this.day).subscribe(
      data => {
        let response = Object.assign(new BaseResponse(), data);
        if(!response.success) {
          console.error('Something went wrong during day update.');
          return;
        }

        console.log('Day updated.');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Day not update.');
      });
  }
}
