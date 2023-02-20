import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Bill } from 'src/bill/schemas/bill.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    example: 'test@email.com',
    description: 'Почта пользователя',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'superPass2000',
    description: 'Пароль',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @Prop()
  firstName: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    description: 'Массив счетов пользователя',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }] })
  bills: Bill[];
}

export const UserSchema = SchemaFactory.createForClass(User);
