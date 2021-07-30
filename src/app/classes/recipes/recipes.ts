import { KeyValue } from '@angular/common';
import { BaseType } from '../base/baseType';
import { Ingredients } from '../ingredients/ingredients';

// Type of recipe.
export enum RecipeType {
    Starter,
    Dish,
    Dessert
}

/// Type of recipe.
export enum Season {
    Autumn,
    Winter,
    Spring,
    Summer
}

export class Recipes extends BaseType{
    public name: string;
    public ingredientIds: Array<KeyValue<string, number>>;
    public timesCooked: number;
    public lastCooked: Date;
    public type: RecipeType;
    public seasons: Array<Season>;
    public userId: number;
    public price: number;
    public ingredients: Array<Ingredients>;

    constructor() {
      super();
    }
  }
