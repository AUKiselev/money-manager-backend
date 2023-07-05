import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { UsersModule } from '../users/users.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

// Modules
import { IncomeModule } from './../income/income.module';
import { BillModule } from './../bill/bill.module';
import { CostModule } from '../cost/cost.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    forwardRef(() => IncomeModule),
    forwardRef(() => BillModule),
    forwardRef(() => CostModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
