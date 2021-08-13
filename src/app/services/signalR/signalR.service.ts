import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Address } from 'src/app/classes/addresses';

import { Ingredients } from 'src/app/classes/ingredients/ingredients';
import { Recipes } from 'src/app/classes/recipes/recipes';
import { EventNotifierNotification } from 'src/app/classes/signalR/signalR';
import { WeekIngredients } from 'src/app/classes/weeks/weekIngredients';
import { Weeks } from 'src/app/classes/weeks/weeks';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  updatesHubConnection: signalR.HubConnection;
  public ingredientNotification: EventEmitter<EventNotifierNotification<Ingredients>> = new EventEmitter<EventNotifierNotification<Ingredients>>();
  public recipeNotification: EventEmitter<EventNotifierNotification<Recipes>> = new EventEmitter<EventNotifierNotification<Recipes>>();
  public weekNotification: EventEmitter<EventNotifierNotification<Weeks>> = new EventEmitter<EventNotifierNotification<Weeks>>();
  public weekIngredientNotification: EventEmitter<EventNotifierNotification<WeekIngredients>> = new EventEmitter<EventNotifierNotification<WeekIngredients>>();

  public StartConnections(sessionKey: string) {
    this.StopConnection();
    console.log(Address.Get("websocket/hub/", "updates"));
    this.updatesHubConnection = new signalR.HubConnectionBuilder().withUrl(Address.Get("websocket/hub/", "updates"), {
      accessTokenFactory: () => sessionKey
    }).configureLogging(signalR.LogLevel.Information).build();

    this.updatesHubConnection.on('Ingredients', (data) => {
      this.ingredientNotification.emit(data);
    });

    this.updatesHubConnection.on('Recipes', (data) => {
      this.ingredientNotification.emit(data);
    });

    this.updatesHubConnection.on('Weeks', (data) => {
      this.ingredientNotification.emit(data);
    });

    this.updatesHubConnection.on('WeekIngredients', (data) => {
      this.ingredientNotification.emit(data);
    });

    this.updatesHubConnection.start().then((data: any) => {
        console.log('Now connected');
    }).catch((error: any) => {
        console.log('Could not connect ' + error);
        setTimeout(() => this.StartConnections(sessionKey), 3000);
    });
  }

  StopConnection() {
    if (this.updatesHubConnection) {
        this.updatesHubConnection.stop();
        this.updatesHubConnection = null;
    }
  }
};
