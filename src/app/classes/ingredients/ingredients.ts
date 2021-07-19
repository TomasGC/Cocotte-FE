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

    static GetUnit(unit){
      switch (Number.parseInt(IngredientUnit[unit])) {
        case IngredientUnit.Grammes: return "g";
        case IngredientUnit.Centiliters: return "cl";
        case IngredientUnit.Pinch: return "pincées";
        case IngredientUnit.Slices: return "tranches";
        case IngredientUnit.Pieces: return "morceaux";
        case IngredientUnit.Tablespoon: return "cs";
        case IngredientUnit.Teaspoon: return "cc";
        case IngredientUnit.None: return "";
        default: return unit;
      }
    }

    static GetFullUnit(unit){
      switch (Number.parseInt(IngredientUnit[unit])) {
        case IngredientUnit.Grammes: return "Grammes";
        case IngredientUnit.Centiliters: return "Centilitres";
        case IngredientUnit.Pinch: return "Pincées";
        case IngredientUnit.Slices: return "Tranches";
        case IngredientUnit.Pieces: return "Morceaux";
        case IngredientUnit.Tablespoon: return "Cuillères à soupe";
        case IngredientUnit.Teaspoon: return "Cuillères à café";
        case IngredientUnit.None: return "";
        default: return unit;
      }
    }

    static GetType(type){
      switch (Number.parseInt(IngredientType[type])) {
        case IngredientType.Condiment: return "Condiment";
        case IngredientType.Dairy: return "Produit Laitier";
        case IngredientType.Egg: return "Oeuf";
        case IngredientType.Fat: return "Gras";
        case IngredientType.Fish: return "Poisson";
        case IngredientType.Fruit: return "Fruit";
        case IngredientType.Liquid: return "Liquide";
        case IngredientType.Meat: return "Viande";
        case IngredientType.Starchy: return "Féculent";
        case IngredientType.Sweet: return "Sucre";
        case IngredientType.Vegetable: return "Légume";
        default: return type;
      }
    }
  }
