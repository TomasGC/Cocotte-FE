import { BaseRequest } from '../base/requests';
import { Recipes } from './recipes';

export class AddOrUpdateRecipe extends BaseRequest {
    public recipe: Recipes;
    public file: FormData;

    constructor() {
      super();
    }
  }
