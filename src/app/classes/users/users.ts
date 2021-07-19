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

    static GetDay(day){
      switch (Number.parseInt(DayOfWeek[day])) {
        case DayOfWeek.Sunday: return "Dimanche";
        case DayOfWeek.Monday: return "Lundi";
        case DayOfWeek.Tuesday: return "Mardi";
        case DayOfWeek.Wednesday: return "Mercredi";
        case DayOfWeek.Thursday: return "Jeudi";
        case DayOfWeek.Friday: return "Vendredi";
        case DayOfWeek.Saturday: return "Samedi";
        default: return "";
      }
    }
  }
