import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @ApiProperty({
    example: 'Случайная строка(генерируется автоматически)',
    description: 'ID пользователя в БД',
  })
  @Prop({ ref: 'User', type: 'ObjectId' })
  user: ObjectId;

  @ApiProperty({
    example: 'Генерируется автоматически',
    description: 'Токен пользователя',
  })
  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
