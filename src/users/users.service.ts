import { CreateCostDto } from './../cost/dtos/create-cost.dto';
import { IncomeService } from './../income/income.service';
import { CreateIncomeDto } from './../income/dtos/create-income.dto';
import { CreateBillDto } from './../bill/dtos/create-bill.dto';
import { TokenService } from './token.service';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { IRegistrationData } from './interfaces/users.model';
import { BillService } from 'src/bill/bill.service';
import { CostService } from 'src/cost/cost.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
    @Inject(forwardRef(() => BillService))
    private billService: BillService,
    @Inject(forwardRef(() => IncomeService))
    private incomeService: IncomeService,
    @Inject(forwardRef(() => CostService))
    private costService: CostService,
  ) {}

  async registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<IRegistrationData> {
    const emailCheck = await this.userModel.findOne({ email });
    if (emailCheck) {
      throw new HttpException(
        'Пользователь с таким e-mail уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.userModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });

    const billModel = {
      name: 'Наличные',
      user: user._id,
    };
    const billDto = new CreateBillDto(billModel);
    const bill = await this.billService.create(billDto);
    user.bills.push(bill);

    const incomeModel = {
      name: 'Зарплата',
      user: user._id,
    };
    const incomeDto = new CreateIncomeDto(incomeModel);
    const income = await this.incomeService.create(incomeDto);
    user.incomes.push(income);

    const costModel = {
      name: 'Продукты',
      user: user._id,
    };
    const costDto = new CreateCostDto(costModel);
    const cost = await this.costService.create(costDto);
    user.costs.push(cost);

    await user.save();
    user.populate(['bills', 'incomes', 'costs']);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email: string, password: string): Promise<IRegistrationData> {
    const user = await this.userModel
      .findOne({ email })
      .populate(['bills', 'incomes', 'costs']);
    if (!user) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const { deletedCount } = await this.tokenService.removeToken(refreshToken);
    if (!deletedCount) {
      throw new HttpException('Ошибка запроса', HttpStatus.BAD_REQUEST);
    }
  }

  async refresh(refreshToken: string): Promise<IRegistrationData> {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    const userData = this.tokenService.validateToken(
      refreshToken,
      process.env.JWT_REFRESH_KEY,
    );
    const tokenFromDB = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    const { id } = userData as {
      id: string;
    };
    const user = await this.userModel
      .findById(id)
      .populate(['bills', 'incomes', 'costs']);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers(): Promise<User[]> {
    const users = this.userModel.find();

    return users;
  }
}
