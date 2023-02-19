import { HttpException } from '@nestjs/common';
// import { AuthGuard } from './guards/auth.guard';
import { AuthUserDto } from './dtos/auth-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  // UseGuards,
} from '@nestjs/common';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { Response, Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Зарегистрировать пользователя',
  })
  @Post('/registration')
  async registration(
    @Body() dto: RegistrationUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { email, password, firstName, lastName } = dto;
      const userData = await this.usersService.registration(
        email,
        password,
        firstName,
        lastName,
      );

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return userData;
    } catch (e) {
      console.log(e);

      return e;
    }
  }

  @ApiOperation({
    summary: 'Авторизовать пользователя',
  })
  @Post('/login')
  async login(
    @Body() dto: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { email, password } = dto;
      const userData = await this.usersService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return userData;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: 'Выйти из аккаунта пользователя',
  })
  @Get('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const { refreshToken } = req.cookies;
      await this.usersService.logout(refreshToken);

      res.clearCookie('refreshToken');
      res.sendStatus(HttpStatus.OK);
    } catch (e) {
      console.log(e);

      return e;
    }
  }

  @ApiOperation({
    summary: 'Обновить токен пользователя',
  })
  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await this.usersService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return userData;
    } catch (e) {
      console.log(e);

      return e;
    }
  }

  // TODO Убрать это отсюда
  @ApiOperation({
    summary: 'Получить список всех пользователей',
  })
  // @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
