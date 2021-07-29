import { BaseType } from '../base/baseType';
import { DataConfig } from '../configuration/dataConfig';

export class Ingredients extends BaseType{
    constructor(
      public _id?: string,
      public name?: string,
      public basePrice?: number,
      public baseQuantity?: number,
      public quantities?: Array<number>,
      public unitId?: string,
      public unit?: DataConfig,
      public typeId?: string,
      public type?: DataConfig,
      public userId?: number,
      public selectedQuantity?: number) {
      super();
    }
  }
