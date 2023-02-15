import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type IncomeDocument = HydratedDocument<Income>;

@Schema()
export class Income {
  @ApiProperty({
    example: 'Зарплата',
    description: 'Название статьи дохода',
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
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
