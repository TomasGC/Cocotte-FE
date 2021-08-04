import { BaseResponse } from '../base/responses';
import { Ingredients } from './ingredients';

export class ListIngredientsResponse extends BaseResponse {
    public ingredients: Array<Ingredients>;

    constructor() {
      super();
    }
  }
