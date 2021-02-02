import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ingredients } from '../../classes/ingredients/ingredients';
import { Recipes } from '../../classes/recipes/recipes';
import { Weeks } from '../../classes/weeks/weeks';
import { WeekIngredients } from '../../classes/weeks/weekIngredients';
import { environment } from '../../../environments/environment';

import { ListIngredientsResponse } from '../../classes/ingredients/responses';

import { IngredientsService } from '../../services/ingredients/ingredients.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { WeeksService } from '../../services/weeks/weeks.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})

export class WeekComponent implements OnInit {
  title = 'Weekly';
  events = null;
  cookieValue: string;
  ingredients: Array<Ingredients>;
  displayedColumns: string[] = ["position", "name", "basePrice", "baseQuantity", "unit", "modify", "delete"];
  dataSource: Array<Ingredients>;

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;

  constructor(
    private ingredientsService: IngredientsService,
    private recipesService: RecipesService,
    private weeksService: WeeksService,
    private cookieService: CookieService,
    private router: Router) {
    }

  ListIngredients() {
    this.ingredientsService.List().subscribe(
      data => {
        let response = Object.assign(new ListIngredientsResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while getting all the ingredients.' + response.message);
          return;
        }

        console.log('Logged In');
        this.ingredients = response.ingredients;
        this.dataSource = this.ingredients;
      },
      error => {
        console.error('List all ingredients not succeeded.');
      });
  }

  ngOnInit() {
    this.ListIngredients();
  }

}
