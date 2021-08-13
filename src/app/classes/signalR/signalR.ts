import { BaseType } from "../base/baseType";

export enum EventNotifierOperation {
  Create,
  Update,
  Delete
};

export class EventNotifierNotification<T> extends BaseType{
  public submitDate: Date;
  public operation: string;
  public data: T;

  constructor() {
    super();
  }
};
