import { BaseResponse } from '../base/responses';
import { Recipes } from './recipes';

export class GetRecipesResponse extends BaseResponse{
    public recipes: Array<Recipes>;

    constructor() {
      super();
    }
  }
