import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { BaseType } from '../../classes/base/baseType';
import { Ingredients, IngredientUnit } from '../../classes/ingredients/ingredients';
import { TabMods } from "../../enums/week-enums.model";
import { Recipes } from '../../classes/recipes/recipes';
import { Weeks } from '../../classes/weeks/weeks';
import { WeekIngredients } from '../../classes/weeks/weekIngredients';
import { environment } from '../../../environments/environment';

import { ListIngredientsResponse } from '../../classes/ingredients/responses';
import { ListRecipesResponse } from '../../classes/recipes/responses';
import { GetWeekResponse } from '../../classes/weeks/responses';

import { IngredientsService } from '../../services/ingredients/ingredients.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { WeeksService } from '../../services/weeks/weeks.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';

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
  public TabMods = TabMods;

  title = 'Ma Semaine';
  events = null;
  cookieValue: string;
  displayedIngredientColumns: string[] = ["position", "name", "basePrice", "baseQuantity", "modify", "delete"];
  displayedRecipeColumns: string[] = ["position", "name", "type", "timesCooked", "price", "modify", "delete"];
  displayedDayColumns: string[] = ["date"];
  displayedMealsColumns: string[] = ["type", "number", "name", "price"];
  tabs = [
    {key: TabMods.Ingredients, value: "Ingrédients"},
    {key: TabMods.Recipes, value: "Recettes"},
    {key: TabMods.Week, value: "Ma Semaine"}
  ];
  dataSource;
  expandedElement: null;
  subDataSource = [];
  currentTab: TabMods = TabMods.Week;
  activeLink = this.tabs[2].value;
  background: ThemePalette = undefined;
  loading: boolean = true;

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;

  constructor(
    private ingredientsService: IngredientsService,
    private recipesService: RecipesService,
    private weeksService: WeeksService,
    private cookieService: CookieService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    public datePipe: DatePipe) {
    }

  ListIngredients() {
    this.loading = true;
    this.ingredientsService.List().subscribe(
      data => {
        let response = Object.assign(new ListIngredientsResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while getting all the ingredients.' + response.message);
          return;
        }

        this.dataSource = response.ingredients;
        // this.Refresh();
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('List all ingredients not succeeded.');
      });
  }

  ListRecipes() {
    this.loading = true;
    this.recipesService.List().subscribe(
      data => {
        let response = Object.assign(new ListRecipesResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while getting all the recipes.' + response.message);
          return;
        }

        this.dataSource = response.recipes;
        // this.Refresh();
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('List all recipes not succeeded.');
      });
  }

  GetWeek() {
    this.loading = true;
    this.weeksService.Current().subscribe(
      data => {
        let response = Object.assign(new GetWeekResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while getting the current week.' + response.message);
          return;
        }

        this.dataSource = response.week.days;
        // for (var i = 0; i < response.week.days.length; ++i) {
        //   this.subDataSource.push({
        //     key: this.dataSource[i].position,
        //     value: this.dataSource[i].meals
        //   });
        // }
        // this.Refresh();
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('Get the current week not succeeded.');
      });
  }

  GetUnit(ingredient: Ingredients){
    switch (Number.parseInt(IngredientUnit[ingredient.unit])) {
      case IngredientUnit.Grammes: return "g";
      case IngredientUnit.Centiliters: return "cl";
      case IngredientUnit.Pinch: return "pincées";
      case IngredientUnit.Slices: return "tranches";
      case IngredientUnit.Pieces: return "morceaux";
      case IngredientUnit.Tablespoon: return "cs";
      case IngredientUnit.Teaspoon: return "cc";
      case IngredientUnit.None: return "";
      default: return ingredient.unit;
    }
  }

  Refresh() {
    this.changeDetectorRefs.detectChanges();
  }

  ngOnInit() {
    var sessionKey = this.cookieService.get('sessionKey');
    if (typeof sessionKey == 'undefined' || !sessionKey)
      this.router.navigate(['/login']);

    this.GetWeek();
  }

  onTabClick(tab: TabMods) {
    this.currentTab = tab;
    switch(tab){
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
}
