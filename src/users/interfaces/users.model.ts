import { UserDto } from '../dtos/user.dto';

export interface IRegistrationData {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
