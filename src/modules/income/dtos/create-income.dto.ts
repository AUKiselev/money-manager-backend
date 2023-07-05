import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateIncomeDto {
  @ApiProperty({
    example: 'Зарплата',
    description: 'Название статьи дохода',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Объект настроек статьи дохода',
  })
  readonly settings?: {
    icon?: string;
    color?: string;
  };

  @ApiProperty({
    description: 'ID пользователя, добавляется автоматически',
  })
  readonly user: ObjectId;

  constructor(model) {
    this.name = model.name;
    this.user = model.user;
    this.settings = model.settings;
  }
}
