import { BaseType } from '../base/baseType';
import { IngredientPrices } from './ingredientPrices';

// Ingredient price units.
export enum IngredientPriceUnits {
  // Price per kilogram.
  Kilogram,
  // Price per liter.
  Liter,
  // Unit price for ingredients such as: advocado, melon, eggs, etc.
  Piece
};

// <summary>
// Ingredient categories.
// </summary>
export enum IngredientCategories {
  // Vegetables.
  Vegetable,
  // Fruits.
  Fruit,
  // Beaf, chicken, etc.
  Meat,
  // Tuna, salmon, etc.
  Fish,
  // Shrimps, crabs, etc.
  SeaFood,
  // Egg.
  Egg,
  // Milk, yoghurt, cheese, etc.
  Dairy,
  // Pasta, rice, etc.
  Starchy,
  // Flour, sesame, corn, etc.
  Cereal,
  // Lents, beans, soy, etc.
  Leguminous,
  // Condiment
  Condiment,
  // Aromat and spices
  Spice,
  // Butter, oil, etc.
  Fat,
  // Sugar, chocolate, etc.
  Sweet,
  // Alcohol, coffee, tea, etc.
  Drink
};

// Used to store the ingredients for the recipes.
export class Ingredients extends BaseType {
    constructor(
      public _id?: string,
      public priceUnit?: IngredientPriceUnits, // Base price unit.
      public name?: string, // Name of the ingredient.
      public categories?: Array<IngredientCategories>, // Categories that fit the ingredient.
      public price?: IngredientPrices) { // Price information.
      super();
    }
  }
