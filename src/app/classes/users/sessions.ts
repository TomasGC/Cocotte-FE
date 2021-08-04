import { BaseType } from "../base/baseType";

export class Sessions extends BaseType {
    public key: string;
    public userId: number;
    public creationDate: Date;

    constructor() {
      super();
    }
  }
