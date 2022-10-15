import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { DatePipe, KeyValue } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { PullToRefreshService } from '@piumaz/pull-to-refresh';

import { Ingredients } from '../../classes/ingredients/ingredients';
import { TabMods } from "../../enums/week-enums.model";
import { environment } from '../../../environments/environment';

import { ListIngredientsResponse } from '../../classes/ingredients/responses';
import { ListRecipesResponse } from '../../classes/recipes/responses';
import { GetWeekResponse } from '../../classes/weeks/responses';

import { IngredientsService } from '../../services/ingredients/ingredients.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { WeeksService } from '../../services/weeks/weeks.service';
import { CookieService } from 'ngx-cookie-service';

import { IngredientsComponent } from './ingredients/ingredients.component';
import { MatTableDataSource } from '@angular/material/table';
import { RecipesComponent } from './recipes/recipes.component';
import { BaseResponse } from 'src/app/classes/base/responses';
import { DeleteRequest } from 'src/app/classes/base/requests';
import { Recipes } from 'src/app/classes/recipes/recipes';
import { DaysComponent } from './days/days.component';
import { Day, Meal, Weeks } from 'src/app/classes/weeks/weeks';
import { IsEmpty } from 'src/app/classes/tools';
import { WeekIngredientsComponent } from './week-ingredients/week-ingredients.component';
import { LanguageTypes } from 'src/app/classes/users/users';
import { SignalRService } from 'src/app/services/signalR/signalR.service';
import { EventNotifierNotification, EventNotifierOperation } from 'src/app/classes/signalR/signalR';
import { Console } from 'console';

@Component({
  selector: 'week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class WeekComponent implements OnInit {
//#region Properties
  Ingredients = Ingredients;
  Recipes = Recipes;
  Meal = Meal;
  public TabMods = TabMods;
  currentTab: TabMods = TabMods.Week;

  title = 'Ma Semaine';
  events = null;
  cookieValue: string;

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;
  color: string;
  background: ThemePalette = undefined;
  loading: boolean = true;

  dataSourceIngredients : MatTableDataSource<Ingredients> = null;
  dataSourceRecipes : MatTableDataSource<Recipes> = null;
  dataSourceDay : MatTableDataSource<Day>;

  displayedIngredientColumns: string[] = ["name", "price", "priceUnit", "modify", "delete"];
  displayedRecipeColumns: string[] = ["name", "type", "timesCooked", "price", "modify", "delete"];
  displayedDayColumns: string[] = ["date"];
  displayedMealsColumns: string[] = ["type", "number", "price"];

  userLanguage: LanguageTypes;

  expandedElement: null;
//#endregion Properties

  constructor(
    private signalRService: SignalRService,
    private ingredientsService: IngredientsService,
    private recipesService: RecipesService,
    private weeksService: WeeksService,
    private cookieService: CookieService,
    private router: Router,
    private pullToRefreshService: PullToRefreshService,
    public datePipe: DatePipe,
    public dialog: MatDialog) {
      pullToRefreshService.refresh$().subscribe(() => {
        this.Reload();

        setTimeout(() => {
          console.log('dismiss by service');
          pullToRefreshService.dismiss();
        }, 1000);

      });

      document.addEventListener('pull-to-refresh', () => {
        this.Reload();
      });
    }

//#region General
ngOnInit() {
  var sessionKey = this.cookieService.get('sessionKey');
  if (typeof sessionKey == 'undefined' || !sessionKey)
    this.router.navigate(['/login']);

  this.userLanguage = LanguageTypes[this.cookieService.get('language')];
  this.GetWeek();

  this.signalRService.StartConnections(sessionKey);

  this.signalRService.ingredientNotification.subscribe(data => this.onIngredientReceived(data));
  this.signalRService.recipeNotification.subscribe(data => this.onRecipeReceived(data));
  this.signalRService.weekNotification.subscribe(data => this.onWeekReceived(data));
}

onTabClick($event) {
  var tab : TabMods = $event.index;
  this.currentTab = tab;

  if (this.currentTab == TabMods.Ingredients && this.dataSourceIngredients == null)
    this.ListIngredients();

  if (this.currentTab == TabMods.Recipes && this.dataSourceRecipes == null)
    this.ListRecipes();
}

Reload() {
  switch(this.currentTab){
    case TabMods.Ingredients:
      this.ListIngredients();
      break;
    case TabMods.Recipes:
      this.ListRecipes();
      break;
    case TabMods.Week:
      this.GetWeek();
      break;
  }
}

RemoveItem(index): void {
  switch(this.currentTab){
    case TabMods.Ingredients:{
      let id = this.dataSourceIngredients.data[index]._id;
      this.ingredientsService.Delete(new DeleteRequest(id)).subscribe(
        data => {
          let response = Object.assign(new BaseResponse(), data);
          if(!response.success) {
            console.error('Something went wrong during ingredient deletion.');
            return;
          }
          console.log('Ingredient deleted.');
          this.ListIngredients();
        },
        error => {
          console.error('Ingredient not deleted.');
        });

        let temp = this.dataSourceIngredients.data;
        temp.splice(index, 1);
        this.dataSourceIngredients.data = temp;
      }
      break;
    case TabMods.Recipes:{
      let id = this.dataSourceRecipes.data[index]._id;
      this.recipesService.Delete(new DeleteRequest(id)).subscribe(
        data => {
          let response = Object.assign(new BaseResponse(), data);
          if(!response.success) {
            console.error('Something went wrong during recipe deletion.');
            return;
          }
          console.log('Recipe deleted.');
          this.ListRecipes();
        },
        error => {
          console.error('Recipe not deleted.');
        });

        let temp = this.dataSourceRecipes.data;
        temp.splice(index, 1);
        this.dataSourceRecipes.data = temp;
      }
      break;
  }
}
//#endregion General

//#region Ingredients
ListIngredients() {
  this.loading = true;
  this.ingredientsService.List().subscribe(
    data => {
      let response = Object.assign(new ListIngredientsResponse(), data);
      if(!response.success) {
        this.loading = false;
        console.error('Something went wrong while getting all the ingredients.' + response.message);
        return;
      }

      this.dataSourceIngredients = new MatTableDataSource(response.ingredients);
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.error('List all ingredients not succeeded.');
    });
}

OpenIngredientMenu(ingredient): void {
  if (ingredient == null){
    ingredient = new Ingredients();
    ingredient.quantity = new Array<number>();
  }

  const dialogRef = this.dialog.open(IngredientsComponent, {
    height: '800px',
    width: '600px',
    data: ingredient,
    backdropClass: 'backdropBackground',
    panelClass: 'modalBox'
  });

  dialogRef.afterClosed().subscribe(modified => {
    if (modified == true)
      this.ListIngredients();
  });
}

onIngredientReceived(data: EventNotifierNotification<Ingredients>) {
  if (this.dataSourceIngredients == null)
    return;

  let temp = this.dataSourceIngredients.data;
  switch (EventNotifierOperation[data.operation]) {
    case EventNotifierOperation.Create: {
      temp.push(data.data);
      break;
    }
    case EventNotifierOperation.Update: {
      const index = temp.findIndex(x => x._id == data.data._id);
      temp[index].categories = data.data.categories;
      temp[index].name = data.data.name;
      temp[index].priceUnit = data.data.priceUnit;
      temp[index].price = data.data.price.userId == temp[index].price.userId ? data.data.price : temp[index].price;
      break;
    }
    case EventNotifierOperation.Delete: {
      const index = temp.findIndex(x => x._id == data.data._id);
      temp.splice(index, 1);
      break;
    }
  }

  this.dataSourceIngredients.data = temp;
}
//#endregion Ingredients

//#region Recipes
ListRecipes() {
  this.loading = true;
  this.recipesService.List().subscribe(
    data => {
      let response = Object.assign(new ListRecipesResponse(), data);
      if(!response.success) {
        this.loading = false;
        console.error('Something went wrong while getting all the recipes.' + response.message);
        return;
      }

      this.dataSourceRecipes = new MatTableDataSource(response.recipes);
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.error('List all recipes not succeeded.');
    });
}

OpenRecipeMenu(recipe): void {
  if (recipe == null) {
    recipe = new Recipes();
    recipe.ingredientIds = new Array<KeyValue<string, number>>();
    recipe.ingredients = new Array<Ingredients>();
  }

  const dialogRef = this.dialog.open(RecipesComponent, {
    height: '800px',
    width: '700px',
    data: recipe,
    backdropClass: 'backdropBackground',
    panelClass: 'modalBox'
  });

  dialogRef.afterClosed().subscribe(modified => {
    if (modified == true)
      this.ListRecipes();
  });
}

onRecipeReceived(data: EventNotifierNotification<Recipes>) {
  if (this.dataSourceRecipes == null)
  return;

  let temp = this.dataSourceRecipes.data;
  switch (EventNotifierOperation[data.operation]) {
    case EventNotifierOperation.Create: {
      temp.push(data.data);
      break;
    }
    case EventNotifierOperation.Update: {
      const index = temp.findIndex(x => x._id == data.data._id);
      temp[index] = data.data;
      break;
    }
    case EventNotifierOperation.Delete: {
      const index = temp.findIndex(x => x._id == data.data._id);
      temp.splice(index, 1);
      break;
    }
  }

  this.dataSourceRecipes.data = temp;
}
//#endregion Recipes

//#region Week
GetWeek() {
  this.loading = true;
  this.weeksService.Current().subscribe(
    data => {
      let response = Object.assign(new GetWeekResponse(), data);
      if(!response.success) {
        this.loading = false;
        console.error('Something went wrong while getting the current week.' + response.message);
        return;
      }

      this.dataSourceDay = new MatTableDataSource(response.week.days);

      this.loading = false;
    },
    error => {
      this.loading = false;
      console.error('Get the current week not succeeded.');
    });
}

OpenDayMenu(day): void {
  const dialogRef = this.dialog.open(DaysComponent, {
    height: '800px',
    width: '1000px',
    data: day,
    backdropClass: 'backdropBackground',
    panelClass: 'modalBox'
  });

  dialogRef.afterClosed().subscribe(modified => {
    if (modified == true)
      this.GetWeek();
  });
}

OpenWeekIngredientsMenu(): void {
  const dialogRef = this.dialog.open(WeekIngredientsComponent, {
    height: '800px',
    width: '700px',
    backdropClass: 'backdropBackground',
    panelClass: 'modalBox'
  });
}

GenerateWeek() {
  this.loading = true;
  this.weeksService.Generate().subscribe(
    data => {
      let response = Object.assign(new BaseResponse(), data);
      if(!response.success) {
        this.loading = false;
        console.error('Something went wrong while getting the current week.' + response.message);
        return;
      }

      this.GetWeek();
    },
    error => {
      this.loading = false;
      console.error('Get the current week not succeeded.');
    });
}

public GetDay(date: Date): string {
  const language = this.cookieService.get('language');
  const event = new Date(date);
  return event.toLocaleDateString(language, { weekday:'long', day:'numeric', month:'long' });
}

onWeekReceived(data: EventNotifierNotification<Weeks>) {
  this.dataSourceDay = new MatTableDataSource(data.data.days);
}
//#endregion Week
}
