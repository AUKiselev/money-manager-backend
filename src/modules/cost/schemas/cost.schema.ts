import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CostDocument = mongoose.HydratedDocument<Cost>;

@Schema()
export class Cost {
  @ApiProperty({
    description: 'Ref юзера, к которому привязана статья расхода',
  })
  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;

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
    example: '{icon: "pajamas:food", color: "#FFFFFF"}',
    description: 'Объект настроек отображения счета',
    default: '{icon: "pajamas:food", color: "#FF4437"}',
  })
  @Prop({
    type: {
      icon: { type: String },
      color: { type: String },
    },
    default: {
      icon: 'pajamas:food',
      color: '#FF4437',
    },
  })
  settings: {
    icon: string;
    color: string;
  };
}

export const CostSchema = SchemaFactory.createForClass(Cost);
