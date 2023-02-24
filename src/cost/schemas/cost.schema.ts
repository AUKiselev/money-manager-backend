import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CostDocument = HydratedDocument<Cost>;

@Schema()
export class Cost {
  @ApiProperty({
    example: 'Продукты',
    description: 'Название статьи расхода',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 1000,
    description: 'Кол-во денег',
    default: 0,
  })
  @Prop({ default: 0 })
  sum: number;

  @ApiProperty({
    example: 1000,
    description: 'Лимит расхода',
    default: 0,
  })
  @Prop({ default: 0 })
  limit: number;

  @ApiProperty({
    example: '',
    description: 'Иконка статьи расхода',
    default: '',
  })
  @Prop()
  icon: string;

  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;
}

export const CostSchema = SchemaFactory.createForClass(Cost);
