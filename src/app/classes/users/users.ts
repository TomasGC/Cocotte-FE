import { KeyValue } from "@angular/common";
import { MealType } from "../weeks/weeks";

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  None
}

export class DayMealsSchedule {
  public day: DayOfWeek;
  public meals: Array<KeyValue<MealType, boolean>>;

  constructor() {}
}

export class Users {
    public login: string;
    public password: string;
    public timeBetweenMeals: number;
    public dayMealsSchedule: Array<DayMealsSchedule>;

    constructor() {}
  }
