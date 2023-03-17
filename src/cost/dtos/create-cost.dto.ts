import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCostDto {
  @ApiProperty({
    example: 'Наличные',
    description: 'Название статьи расхода',
  })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: 'Лимит расходов',
  })
  readonly limit?: number;

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
    this.limit = model.limit;
    this.icon = model.icon;
  }
}
