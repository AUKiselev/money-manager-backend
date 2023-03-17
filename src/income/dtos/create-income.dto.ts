import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateIncomeDto {
  @ApiProperty({
    example: 'Зарплата',
    description: 'Название статьи дохода',
  })
  readonly name: string;

  @ApiProperty({
    example: 'iconoir:lot-of-cash',
    description: 'Название иконки статьи расхода',
  })
  readonly icon?: string;

  @ApiProperty({
    description: 'ID пользователя, добавляется автоматически',
  })
  readonly user: ObjectId;

  constructor(model) {
    this.name = model.name;
    this.user = model.user;
    this.icon = model.icon;
  }
}
