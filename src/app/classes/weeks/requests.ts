import { BaseRequest } from '../base/requests'
import { Day } from './weeks';

export class UpdateDayRequest extends BaseRequest {
    public day: Day;

    constructor() {
      super();
    }
  }
