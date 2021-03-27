enum Environment {
  Local,
  Production
}

export interface Configuration {
  environment: Environment;
  host: string;
}

export class Address {
  static environment = Environment.Local;
  static configurations: Array<Configuration> = [
    { environment: Environment.Local, host: "http://localhost:5002/" },
    { environment: Environment.Production, host: "https://cocotte.azurewebsites.net/" }
  ];

  constructor() { }

  public static Get(baseRoute: string, route: string) {
    return this.configurations.find(x => x.environment == this.environment).host + baseRoute + route;
  }
}
