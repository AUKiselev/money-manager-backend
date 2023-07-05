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
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { IRegistrationData } from './interfaces/users.model';
import { BillService } from '../bill/bill.service';
import { CostService } from '../cost/cost.service';

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
      user: user._id,
      name: 'Наличные',
      settings: {
        icon: 'iconoir:lot-of-cash',
        color: '#222222',
      },
    };
    const billDto = new CreateBillDto(billModel);
    await this.billService.create(billDto);

    const incomeModel = {
      user: user._id,
      name: 'Зарплата',
      settings: {
        icon: 'material-symbols:computer-outline-rounded',
        color: '#27C153',
      },
    };
    const incomeDto = new CreateIncomeDto(incomeModel);
    await this.incomeService.create(incomeDto);

    const costModel = {
      user: user._id,
      name: 'Продукты',
      settings: {
        icon: 'pajamas:food',
        color: '#FF4437',
      },
    };
    const costDto = new CreateCostDto(costModel);
    await this.costService.create(costDto);

    await user.save();

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    const { bills, costs, incomes } = await this.getAllEntities(user.id);

    const userData = {
      user: { ...userDto },
      bills,
      costs,
      incomes,
    };

    return { ...tokens, userData };
  }

  async login(email: string, password: string): Promise<IRegistrationData> {
    const user = await this.userModel.findOne({ email });

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!user || !isPassEquals) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    const { bills, costs, incomes } = await this.getAllEntities(user.id);

    const userData = {
      user: { ...userDto },
      bills,
      costs,
      incomes,
    };

    return { ...tokens, userData };
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
    const user = await this.userModel.findById(id);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    const { bills, costs, incomes } = await this.getAllEntities(user.id);

    const userObj = {
      user: { ...userDto },
      bills,
      costs,
      incomes,
    };

    return { ...tokens, userData: userObj };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  async getAllEntities(userId: ObjectId) {
    const bills = await this.billService.getAllByUserId(userId);
    const costs = await this.costService.getAllByUserId(userId);
    const incomes = await this.incomeService.getAllByUserId(userId);

    return { bills, costs, incomes };
  }
}
