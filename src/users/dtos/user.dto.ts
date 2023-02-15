// import { User } from './../schemas/user.schema';

export class UserDto {
  readonly login: string;
  readonly email: string;
  readonly id: string;

  constructor(model) {
    this.login = model.login;
    this.email = model.email;
    this.id = model._id;
  }
}
