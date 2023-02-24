import { Cost } from './../../cost/schemas/cost.schema';
import { Income } from './../../income/schemas/income.schema';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Bill } from 'src/bill/schemas/bill.schema';

export class UserDto {
  @ApiProperty({
    example: 'test@email.com',
    description: 'Почта пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Случайная строка(генерируется автоматически)',
    description: 'ID пользователя',
  })
  readonly id: ObjectId;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  readonly firstName?: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  readonly lastName?: string;

  @ApiProperty({
    description: 'Список счетов',
  })
  readonly bills: [Bill];

  @ApiProperty({
    description: 'Список доходов',
  })
  readonly incomes: [Income];

  @ApiProperty({
    description: 'Список расходов',
  })
  readonly costs: [Cost];

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    if (model.firstName) this.firstName = model.firstName;
    if (model.lastName) this.lastName = model.lastName;
    this.bills = model.bills;
    this.incomes = model.incomes;
    this.costs = model.costs;
  }
}
