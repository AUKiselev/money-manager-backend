import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
