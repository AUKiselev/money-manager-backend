import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type BillDocument = HydratedDocument<Bill>;

@Schema()
export class Bill {
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
    example: '',
    description: 'Иконка статьи дохода',
    default: '',
  })
  @Prop()
  icon: string;

  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
