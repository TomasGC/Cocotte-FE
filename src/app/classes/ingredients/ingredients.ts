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

/// The type for the ingredients.
export enum IngredientType {
  Condiment,
  Meat,
  Fish,
  Egg,
  Fruit,
  Vegetable,
  Liquid,
  Starchy,
  Dairy,
  Fat,
  Sweet
}

export class Ingredients extends BaseType{
    constructor(
      public _id?: string,
      public name?: string,
      public basePrice?: number,
      public baseQuantity?: number,
      public quantities?: Array<number>,
      public unit?: IngredientUnit,
      public type?: IngredientType,
      public userId?: number,
      public selectedQuantity?: number) {
      super();
    }
  }
