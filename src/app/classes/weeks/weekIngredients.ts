import { BaseType } from '../base/baseType';
import { Ingredients } from '../ingredients/ingredients';

export class WeekIngredient extends BaseType{
    public checked: boolean;
    public ingredient: Ingredients;
    public totalQuantity: number;

    constructor() {
      super();
    }
  }

export class WeekIngredients extends BaseType{
    public ingredients: Array<WeekIngredient>;
    public userId: number;
    public totalPrice: number;

    constructor() {
      super();
    }
  }
