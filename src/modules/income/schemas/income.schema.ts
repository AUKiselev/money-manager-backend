import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type IncomeDocument = mongoose.HydratedDocument<Income>;

@Schema()
export class Income {
  @ApiProperty({
    description: 'Ref юзера, к которому привязана статья дохода',
  })
  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: User;

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
    example:
      '{icon: "material-symbols:computer-outline-rounded", color: "#FFFFFF"}',
    description: 'Объект настроек отображения статьи дохода',
    default:
      '{icon: "material-symbols:computer-outline-rounded", color: "#27C153"}',
  })
  @Prop({
    type: {
      icon: { type: String },
      color: { type: String },
    },
    default: {
      icon: 'material-symbols:computer-outline-rounded',
      color: '#27C153',
    },
  })
  settings: {
    icon: string;
    color: string;
  };
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
