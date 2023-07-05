import { ApiProperty } from '@nestjs/swagger';
import { Bill } from 'src/modules/bill/schemas/bill.schema';
import { Cost } from 'src/modules/cost/schemas/cost.schema';
import { Income } from 'src/modules/income/schemas/income.schema';

export class UpdateTransactionDto {
  @ApiProperty({
    description: 'Дата создания транзакции',
  })
  readonly createDate: Date;

  @ApiProperty({
    description: 'Тип транзакции',
  })
  readonly type: 'INCOME' | 'EXPENSE' | 'TRANSFER';

  @ApiProperty({
    description: 'Счет, откуда транзакция',
  })
  readonly billFrom?: Bill;

  @ApiProperty({
    description: 'Счет, куда транзакция',
  })
  readonly billTo?: Bill;

  @ApiProperty({
    description: 'Источник дохода, откуда деньги',
  })
  readonly incomeFrom?: Income;

  @ApiProperty({
    description: 'Статья расхода, куда потрачены деньги',
  })
  readonly costTo?: Cost;

  @ApiProperty({
    description: 'Сумма транзакции',
  })
  readonly value?: number;
}
