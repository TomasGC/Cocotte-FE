import { KeyValue } from "@angular/common";
import { BaseType } from "../base/baseType";
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

export enum LanguageTypes {
  fr,
  en
}

export class DailyMeals {
  public day: DaysOfWeek;
  public meals: Array<KeyValue<MealTypes, Array<boolean>>>;

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
