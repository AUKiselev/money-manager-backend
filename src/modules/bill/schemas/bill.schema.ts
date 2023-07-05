import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type BillDocument = mongoose.HydratedDocument<Bill>;

@Schema()
export class Bill {
  @ApiProperty({
    description: 'Ref юзера, к которому привязан счет',
  })
  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;

  @ApiProperty({
    example: 'Наличные',
    description: 'Название счета',
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
    example: '{icon: "iconoir:lot-of-cash", color: "#FFFFFF"}',
    description: 'Объект настроек отображения счета',
    default: '{icon: "iconoir:lot-of-cash", color: "#222222"}',
  })
  @Prop({
    type: {
      icon: { type: String },
      color: { type: String },
    },
    default: {
      icon: 'iconoir:lot-of-cash',
      color: '#222222',
    },
  })
  settings: {
    icon: string;
    color: string;
  };
}

export const BillSchema = SchemaFactory.createForClass(Bill);
