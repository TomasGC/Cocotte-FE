import { KeyValue } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseType } from '../base/baseType';
import { Ingredients } from '../ingredients/ingredients';

// Type of recipe.
export enum RecipeTypes {
  // Starter.
  Starter,
  // Dish.
  Dish,
  // Dessert.
  Dessert,
  // Pastry.
  Pastry
};

// Seasons.
export enum Seasons {
  // Autumn.
  Autumn,
  // Winter.
  Winter,
  // Spring.
  Spring,
  // Summer.
  Summer
};

// Ingredient units.
export enum IngredientUnits {
  // Grammes.
  Grammes,
  // Centiliters.
  Centiliters,
  // Unit price for ingredients such as: advocado, melon, eggs, etc.
  Pieces,
  // Tablespoon: 1,5cl or 30g.
  Tablespoon,
  // Teaspoon: 0.5cl or 10g.
  Teaspoon
};

// The ingredient infos.
export class IngredientInfos extends BaseType {
  constructor(
    public _id?: string, // Id.
    public quantity?: number, // Quantity needed.
    public unit?: IngredientUnits, // Unit of this ingredient.
    public ingredient?: Ingredients) { // The ingredient.
    super();
  }
};

export class Recipes extends BaseType {
    public timesCooked: number;
    public price: number;
    public type: RecipeTypes;
    public userId: string;
    public lastCooked: Date;
    public name: string;
    public bestSeasons: Array<Seasons>;
    public ingredients: Array<IngredientInfos>;

    constructor() {
      super();
    }
  };
