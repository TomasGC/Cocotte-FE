import { KeyValue } from "@angular/common";
import { BaseType } from "../base/baseType";
import { LanguageTypes } from "../configuration/dataConfigs";
import { MealTypes } from "../weeks/weeks";

export enum DaysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  None
}

export class DailyMeals {
  public day: DaysOfWeek;
  public meals: Array<KeyValue<MealTypes, boolean>>;

  constructor() {}
}

export class Users extends BaseType {
    public login: string;
    public password: string;
    public language: LanguageTypes;
    public timeBetweenMeals: number;
    public dailyMeals: Array<DailyMeals>;

    constructor() {
      super();
    }
  }
