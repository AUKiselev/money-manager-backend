import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'ID пользователя, добавляется автоматически',
  })
  readonly user: ObjectId;

  @ApiProperty({
    description:
      'Тип транзакции, принимает значения "INCOME", "EXPENSE" или "TRANSFER"',
  })
  readonly type: 'INCOME' | 'EXPENSE' | 'TRANSFER';

  @ApiProperty({
    description: 'Дата создания транзакции в формате Timestamp',
  })
  readonly createDate: number;

  @ApiProperty({
    description:
      'Счет, с которого совершена транзация(только типы "TRANSFER" и "EXPENSE")',
  })
  readonly billFrom?: ObjectId;

  @ApiProperty({
    description:
      'Счет, на который была совершена транзакция(только типы "TRANSFER" и "INCOME")',
  })
  readonly billTo?: ObjectId;

  @ApiProperty({
    description:
      'Источник дохода, с которого поступили деньги на какой-либо счет(только тип "INCOME")',
  })
  readonly incomeFrom?: ObjectId;

  @ApiProperty({
    description:
      'Статья расхода, на которую были потрачены деньги с какого-либо счет(только тип "EXPENSE")',
  })
  readonly costTo?: ObjectId;

  @ApiProperty({
    description: 'Сумма транзакции',
  })
  readonly value: number;

  constructor(model) {
    this.user = model.user;
    this.type = model.type;
    this.value = model.value;
    if (model.type === 'EXPENSE') {
      this.billFrom = model.billFrom;
      this.costTo = model.costTo;
    }
    if (model.type === 'INCOME') {
      this.billTo = model.billTo;
      this.incomeFrom = model.incomeFrom;
    }
    if (model.type === 'TRANSFER') {
      this.billFrom = model.billFrom;
      this.billTo = model.billTo;
    }
  }
}
