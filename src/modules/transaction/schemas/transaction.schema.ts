import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Bill } from 'src/modules/bill/schemas/bill.schema';
import { Cost } from 'src/modules/cost/schemas/cost.schema';
import { Income } from 'src/modules/income/schemas/income.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type TransactionDocument = mongoose.HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @ApiProperty({
    description: 'Ref юзера, к которому привязан счет',
  })
  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;

  @ApiProperty({
    description: 'Тип транзакции - доход, расход или перевод между счетами',
    example: 'INCOME',
  })
  @Prop({ required: true })
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';

  @ApiProperty({
    description: 'Дата совершения транзакции',
    example: 1686772260534,
  })
  @Prop({ type: () => Number })
  createDate: number;

  @ApiProperty({
    description:
      'Счет, с которого совершена транзация(только типы "TRANSFER" и "EXPENSE")',
  })
  @Prop({ ref: 'Bill', type: mongoose.Schema.Types.ObjectId })
  billFrom?: Bill;

  @ApiProperty({
    description:
      'Счет, на который была совершена транзакция(только типы "TRANSFER" и "INCOME")',
  })
  @Prop({ ref: 'Bill', type: mongoose.Schema.Types.ObjectId })
  billTo?: Bill;

  @ApiProperty({
    description:
      'Источник дохода, с которого поступили деньги на какой-либо счет(только тип "INCOME")',
  })
  @Prop({ ref: 'Income', type: mongoose.Schema.Types.ObjectId })
  incomeFrom?: Income;

  @ApiProperty({
    description:
      'Статья расхода, на которую были потрачены деньги с какого-либо счет(только тип "EXPENSE")',
  })
  @Prop({ ref: 'Cost', type: mongoose.Schema.Types.ObjectId })
  costTo?: Cost;

  @ApiProperty({
    description: 'Сумма транзакции',
    example: 100,
  })
  @Prop({ required: true, type: () => Number })
  value: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
