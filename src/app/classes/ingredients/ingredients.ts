import { BaseType } from '../base/baseType';

/// The unit for the ingredients.
enum IngredientUnit {
    Grammes,
    Centiliters,
    Pinch,
    Slices,
    Pieces,
    Spoon,
    Teaspoon,
    None = 100
}

export class Ingredients extends BaseType{
    public name: string;
    public basePrice: number;
    public baseQuantity: number;
    public quantities: Array<number>;
    public unit: IngredientUnit;
    public userId: number;
    public selectedQuantity: number;

    constructor() {
      super();
    }
  }
