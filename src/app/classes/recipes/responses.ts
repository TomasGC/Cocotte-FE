import { BaseResponse } from '../base/responses';
import { Recipes } from './recipes';

export class ListRecipesResponse extends BaseResponse{
    public recipes: Array<Recipes>;

    constructor() {
      super();
    }
  }
