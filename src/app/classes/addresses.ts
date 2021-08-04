enum Environments {
  Local,
  Production
}

export interface Configuration {
  environment: Environments;
  host: string;
}

export class Address {
  static environment = Environments.Production;
  static configurations: Array<Configuration> = [
    { environment: Environments.Local, host: "http://localhost:5002/" },
    { environment: Environments.Production, host: "https://cocotte-be.azurewebsites.net/" }
  ];

  constructor() { }

  public static Get(baseRoute: string, route: string) {
    return this.configurations.find(x => x.environment == this.environment).host + baseRoute + route;
  }
}
