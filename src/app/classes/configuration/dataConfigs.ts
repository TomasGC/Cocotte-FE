import { BaseType } from '../base/baseType';

export enum LanguageTypes {
  en,
  fr
};

export enum DataConfigTypes {
  IngredientUnit,
  IngredientType
};

export class LocalizedValue {
  public language: LanguageTypes;
  public value: string;
  public shortValue: string;

  constructor() { }
};

export class DataConfigs extends BaseType {
  public type: DataConfigTypes;
  public names: Array<LocalizedValue>;

  public mainValue: string;
  public mainShortValue: string;

  constructor() {
    super();
  }
}
