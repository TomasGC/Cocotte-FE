import { BaseType } from "../base/baseType";

// Price for an ingredient for a user.
export class IngredientPrices extends BaseType {
  constructor(
    public _id?: string,
    public basePrice?: number, // Base price of the ingredient.
    public ingredientId?: string, // Id of the ingredient we set the price.
    public userId?: string) { // The id of the user.
    super();
  }
};
