import { BaseResponse } from "../base/responses";
import { DataConfigs } from "./dataConfigs";

export class GetDataConfigsResponse extends BaseResponse {
  public dataConfigs: Array<DataConfigs>;

  constructor() {
    super();
  }
}
