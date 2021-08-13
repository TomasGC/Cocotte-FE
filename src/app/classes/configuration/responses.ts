import { BaseResponse } from "../base/responses";

export class GetSignalRServerResponse extends BaseResponse {
  public hostNames: Array<string>;

  constructor() {
    super();
  }
}
