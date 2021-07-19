import { BaseType } from '../base/baseType';
import { Recipes } from '../recipes/recipes';

/// Type of meals in a day.
export enum MealType {
    Breakfast,
    Lunch,
    Dinner
}

export class Meal extends BaseType{
    public type: MealType;
    public recipeId: string;
    public numberOfPeople: number;
    public recipe: Recipes;

    constructor() {
      super();
    }

    static GetType(type){
      switch (Number.parseInt(MealType[type])) {
        case MealType.Breakfast: return "Petit Déjeuner";
        case MealType.Dinner: return "Dîner";
        case MealType.Lunch: return "Déjeuner";
        default: return type;
      }
    }
  }

export class Day extends BaseType{
    public position: number;
    public date: Date;
    public meals: Array<Meal>;
    public price: number;

    constructor() {
      super();
    }
  }

export class Weeks extends BaseType{
    public days: Array<Day>;
    public startTime: Date;
    public totalPrice: number;
    public userId: number;

    constructor() {
      super();
    }
  }
