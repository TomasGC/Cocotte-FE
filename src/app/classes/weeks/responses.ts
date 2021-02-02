import { BaseResponse } from '../base/responses';
import { Recipes } from '../recipes/recipes';
import { Weeks } from './weeks';
import { WeekIngredients } from './weekIngredients';

export class GetWeek extends BaseResponse{
    public week: Weeks;

    constructor() {
      super();
    }
  }

export class GetWeekIngredients extends BaseResponse{
    public weekIngredients: WeekIngredients;

    constructor() {
      super();
    }
  }
