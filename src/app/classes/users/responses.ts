import { BaseResponse } from '../base/responses';
import { Sessions } from './sessions';
import { Users } from './users';

export class LoginResponse extends BaseResponse {
  public user: Users;
  public session: Sessions;

  constructor() {
    super();
  }
}

export class GetUserResponse extends BaseResponse {
  public user: Users;

  constructor() {
    super();
  }
}
