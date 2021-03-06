import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { BaseResponse } from 'src/app/classes/base/responses';
import { IngredientCategories, IngredientPriceUnits } from 'src/app/classes/ingredients/ingredients';
import { EventNotifierOperation } from 'src/app/classes/signalR/signalR';
import { IsEmpty } from 'src/app/classes/tools';
import { LanguageTypes } from 'src/app/classes/users/users';

import { GetWeekIngredientsResponse } from 'src/app/classes/weeks/responses';
import { WeekIngredient, WeekIngredients } from 'src/app/classes/weeks/weekIngredients';
import { SignalRService } from 'src/app/services/signalR/signalR.service';
import { WeeksService } from 'src/app/services/weeks/weeks.service';

@Component({
  selector: 'week-ingredients',
  templateUrl: './week-ingredients.component.html',
  styleUrls: ['./week-ingredients.component.css']
})

export class WeekIngredientsComponent implements OnInit {
  loading: boolean = false;
  priceUnits = Object.keys(IngredientPriceUnits);
  categories = Object.keys(IngredientCategories);
  displayedColumns: string[] = ['name', 'quantity', 'price', 'possessed'];
  weekIngredients: WeekIngredients;
  dataSource: MatTableDataSource<WeekIngredient>;
  hasData: boolean;
  title: string;
  userLanguage: LanguageTypes;

  constructor(
    private signalRService: SignalRService,
    private translate: TranslateService,
    private weeksService: WeeksService,
    public dialogRef: MatDialogRef<WeekIngredientsComponent>) {  }

  ngOnInit() {
    this.loading = true;
    this.weeksService.GetWeekIngredients().subscribe(
      data => {
        let response = Object.assign(new GetWeekIngredientsResponse(), data);
        if(!response.success) {
          this.loading = false;
          console.error('Something went wrong while getting the week ingredients.' + response.message);
          return;
        }

        this.hasData = !IsEmpty(response.weekIngredients) && !IsEmpty(response.weekIngredients.ingredients) && response.weekIngredients.ingredients.length > 0;

        if (this.hasData){
          this.weekIngredients = response.weekIngredients;
          this.dataSource = new MatTableDataSource(this.weekIngredients.ingredients);

          this.title = this.translate.instant('week.dialogs.weekIngredients.title', { price: this.weekIngredients.totalPrice.toFixed(2) });
        }

        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('List all week ingredients not succeeded.');
      });

      this.signalRService.weekIngredientNotification.subscribe(data => {
        switch (EventNotifierOperation[data.operation]) {
          case EventNotifierOperation.Update: {
            this.weekIngredients = data.data;
            break;
          }
          case EventNotifierOperation.Delete: {
            this.Close();
            break;
          }
        }
      });
  }

  Close(): void {
    this.dialogRef.close(false);
  }

  Validate(): void {
    this.weeksService.UpdateWeekIngredients(this.weekIngredients).subscribe(
      data => {
        let response = Object.assign(new BaseResponse(), data);
        if(!response.success) {
          console.error('Something went wrong during week ingredients update.');
          return;
        }

        console.log('Week ingredients updated.');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Week ingredients not updated.');
      });
  }
}
