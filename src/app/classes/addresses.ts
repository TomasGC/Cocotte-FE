enum Environment {
  Local,
  Production
}

export interface Configuration {
  environment: Environment;
  host: string;
}

export class Address {
  static environment = Environment.Production;
  static configurations: Array<Configuration> = [
    { environment: Environment.Local, host: "http://localhost:5002/" },
    { environment: Environment.Production, host: "https://cocotte-be.azurewebsites.net/" }
  ];

  constructor() { }

  public static Get(baseRoute: string, route: string) {
    return this.configurations.find(x => x.environment == this.environment).host + baseRoute + route;
  }
}
