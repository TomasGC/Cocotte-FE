import { BaseRequest } from '../base/requests'

export class LoginRequest extends BaseRequest {
    public login: string;
    public password: string;

    constructor() {
      super();
    }
  }
