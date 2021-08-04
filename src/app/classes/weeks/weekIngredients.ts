import { BaseType } from '../base/baseType';
import { Ingredients } from '../ingredients/ingredients';

export class WeekIngredient extends BaseType {
    public checked: boolean;
    public totalQuantity: number;
    public totalPrice: number;
    public ingredient: Ingredients;

    constructor() {
      super();
    }
  }

export class WeekIngredients extends BaseType {
    public userId: number;
    public totalPrice: number;
    public ingredients: Array<WeekIngredient>;

    constructor() {
      super();
    }
  }
