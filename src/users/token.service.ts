import { UserDto } from './dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { ITokens, IDeleteTokenData } from './interfaces/tokens.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  generateTokens(payload: UserDto): ITokens {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: '30m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string): Promise<IDeleteTokenData> {
    const { acknowledged, deletedCount } = await this.tokenModel.deleteOne({
      refreshToken,
    });

    return {
      acknowledged,
      deletedCount,
    };
  }

  validateToken(token: string, key: string) {
    try {
      const userData = jwt.verify(token, key);

      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({
      refreshToken,
    });

    return tokenData;
  }
}
