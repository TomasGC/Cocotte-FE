import { BaseType } from '../base/baseType';

export enum LanguageType {
  en,
  fr
};

export enum DataConfigType {
  IngredientUnit,
  IngredientType
};

export class LocalizedValue {
  public language: LanguageType;
  public value: string;
  public shortValue: string;

  constructor() { }
};

export class DataConfig extends BaseType{
  public type: DataConfigType;
  public names: Array<LocalizedValue>;

  public mainValue: string;
  public mainShortValue: string;

  constructor() {
    super();
  }
}
