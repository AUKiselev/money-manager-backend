import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { Response } from 'express';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/registration')
  async registration(
    @Body() dto: RegistrationUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { login, email, password } = dto;
      const userData = await this.usersService.registration(
        login,
        email,
        password,
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

  // @Post('/login')
  // async login(@Body() dto: RegistrationUserDto) {
  // return this.usersService.login(dto);
  // }

  // async login(res, req, next) {
  //   try {
  //   } catch (e) {}
  // }

  // async logout(res, req, next) {
  //   try {
  //   } catch (e) {}
  // }

  // async activate(res, req, next) {
  //   try {
  //   } catch (e) {}
  // }

  // async refresh(res, req, next) {
  //   try {
  //   } catch (e) {}
  // }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
