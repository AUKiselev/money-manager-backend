// import { RegistrationUserDto } from './dtos/registration-user.dto';
import { TokenService } from './token.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { IRegistrationData } from './interfaces/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
  ) {}

  async registration(
    login: string,
    email: string,
    password: string,
  ): Promise<IRegistrationData> {
    const emailCheck = await this.userModel.findOne({ email });
    const loginCheck = await this.userModel.findOne({ login });
    if (emailCheck) {
      throw new HttpException(
        'Пользователь с таким e-mail уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (loginCheck) {
      console.log(loginCheck);
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.userModel.create({
      login,
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  // async login(userDto: RegistrationUserDto) {}

  async getAllUsers(): Promise<User[]> {
    const users = this.userModel.find();

    return users;
  }
}
