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
    description: 'Объект настроек статьи расхода',
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
    this.limit = model.limit;
    this.settings = model.settings;
  }
}
