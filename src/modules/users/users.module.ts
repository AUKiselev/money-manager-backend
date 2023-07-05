import { TokenService } from './token.service';
import { Token, TokenSchema } from './schemas/token.schema';
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AccessTokenMiddleware } from 'src/middlewares/access-token.middleware';

// Modules
import { IncomeModule } from './../income/income.module';
import { BillModule } from './../bill/bill.module';
import { CostModule } from '../cost/cost.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    forwardRef(() => BillModule),
    forwardRef(() => IncomeModule),
    forwardRef(() => CostModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.GET });
  }
}
