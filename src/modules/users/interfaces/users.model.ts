import { Bill } from 'src/modules/bill/schemas/bill.schema';
import { UserDto } from '../dtos/user.dto';
import { Income } from 'src/modules/income/schemas/income.schema';
import { Cost } from 'src/modules/cost/schemas/cost.schema';

export interface IRegistrationData {
  accessToken: string;
  refreshToken: string;
  userData: IUserData;
}

export interface IUserData {
  user: UserDto;
  bills: Bill[];
  costs: Cost[];
  incomes: Income[];
}
