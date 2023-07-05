import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { Transaction } from './schemas/transaction.schema';
import { ObjectId } from 'mongoose';

@ApiTags('Транзакции')
@Controller('/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'Создать новую транзакцию',
  })
  @ApiResponse({
    status: 200,
    type: Transaction,
  })
  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить все транзакции по ID пользователя',
  })
  @ApiResponse({
    status: 200,
    type: [Transaction],
  })
  @Get(':userId')
  getAll(@Param('userId') userId: ObjectId) {
    return this.transactionService.getAllById(userId);
  }
}
