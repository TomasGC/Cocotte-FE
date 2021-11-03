import { BaseType } from '../base/baseType';
import { Recipes } from '../recipes/recipes';

/// Type of meals in a day.
export enum MealTypes {
    Breakfast,
    Lunch,
    Dinner
}

export class Meal extends BaseType {
    public type: MealTypes;
    public numberOfPeople: number;
    public price: number;
    public recipeIds: Array<string>;
    public recipes: Array<Recipes>;

    constructor() {
      super();
    }
  }

export class Day extends BaseType {
    public position: number;
    public date: Date;
    public meals: Array<Meal>;
    public price: number;

    constructor() {
      super();
    }
  }

export class Weeks extends BaseType {
    public days: Array<Day>;
    public startTime: Date;
    public totalPrice: number;
    public userId: number;

    constructor() {
      super();
    }
  }
