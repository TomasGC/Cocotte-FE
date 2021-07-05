import { BaseType } from '../base/baseType';

/// The unit for the ingredients.
export enum IngredientUnit {
    Grammes,
    Centiliters,
    Pinch,
    Slices,
    Pieces,
    Tablespoon,
    Teaspoon,
    None = 100
}

export class Ingredients extends BaseType{
    constructor(
      public _id?: string,
      public name?: string,
      public basePrice?: number,
      public baseQuantity?: number,
      public quantities?: Array<number>,
      public unit?: IngredientUnit,
      public userId?: number,
      public selectedQuantity?: number) {
      super();
    }
  }
