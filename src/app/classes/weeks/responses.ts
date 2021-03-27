import { BaseResponse } from '../base/responses';
import { Recipes } from '../recipes/recipes';
import { Weeks } from './weeks';
import { WeekIngredients } from './weekIngredients';

export class GetWeekResponse extends BaseResponse{
    public week: Weeks;

    constructor() {
      super();
    }
  }

export class GetWeekIngredientsResponse extends BaseResponse{
    public weekIngredients: WeekIngredients;

    constructor() {
      super();
    }
  }
