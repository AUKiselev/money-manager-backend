import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../modules/users/token.service';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const userData = this.tokenService.validateToken(
        token,
        process.env.JWT_ACCESS_KEY,
      );
      if (!userData) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      next();
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
