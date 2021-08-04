import { BaseType } from '../base/baseType';
import { DataConfigs } from '../configuration/dataConfigs';

export class Ingredients extends BaseType {
    constructor(
      public _id?: string,
      public name?: string,
      public basePrice?: number,
      public baseQuantity?: number,
      public quantities?: Array<number>,
      public unitId?: string,
      public unit?: DataConfigs,
      public typeId?: string,
      public type?: DataConfigs,
      public userId?: number,
      public selectedQuantity?: number) {
      super();
    }
  }
