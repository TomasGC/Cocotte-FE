import { BaseResponse } from "../base/responses";
import { DataConfig } from "./dataConfig";

export class GetDataConfigsResponse extends BaseResponse {
  public dataConfigs: Array<DataConfig>;

  constructor() {
    super();
  }
}
