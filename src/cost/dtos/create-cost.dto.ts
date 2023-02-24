import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCostDto {
  @ApiProperty({
    example: 'Наличные',
    description: 'Название статьи расхода',
  })
  readonly name: string;

  @ApiProperty({
    description: 'ID пользователя, добавляется автоматически',
  })
  readonly user: ObjectId;

  constructor(model) {
    this.name = model.name;
    this.user = model.user;
  }
}
