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
    Automn,
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

    static GetType(type) {
      switch (Number.parseInt(RecipeType[type])) {
        case RecipeType.Dessert: return "Dessert";
        case RecipeType.Dish: return "Plat";
        case RecipeType.Starter: return "Entrée";
        default: return type;
      }
    }

    static GetSeason(season){
      switch (Number.parseInt(Season[season])) {
        case Season.Automn: return "Automne";
        case Season.Spring: return "Printemps";
        case Season.Summer: return "Été";
        case Season.Winter: return "Hiver";
        default: return season;
      }
    }
  }
