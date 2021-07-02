export class BaseRequest {
    constructor() {}
}

export class DeleteRequest extends BaseRequest {
  constructor(public id: string) {
    super();
    this.id = id;
  }
}
