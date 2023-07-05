import { BillModule } from './modules/bill/bill.module';
import { IncomeModule } from './modules/income/income.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CostModule } from './modules/cost/cost.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.037yt4h.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    ),
    UsersModule,
    IncomeModule,
    BillModule,
    CostModule,
    TransactionModule,
  ],
})
export class AppModule {}
