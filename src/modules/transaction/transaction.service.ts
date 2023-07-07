import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { IncomeService } from '../income/income.service';
import { CostService } from '../cost/cost.service';
import { BillService } from '../bill/bill.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private billService: BillService,
    @Inject(forwardRef(() => IncomeService))
    private incomeService: IncomeService,
    @Inject(forwardRef(() => CostService))
    private costService: CostService,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    if (Number.isNaN(dto.value)) {
      throw new HttpException(
        'Переданы неверные данные',
        HttpStatus.BAD_REQUEST,
      );
    }

    const transactionData = {
      ...dto,
    };

    if (dto.type === 'EXPENSE') {
      const { billFrom, costTo } = dto;

      const bill = await this.billService.getOneById(billFrom);
      bill.sum -= dto.value;
      await this.billService.updateOne(billFrom, bill);

      const cost = await this.costService.getOneById(costTo);
      cost.sum += dto.value;
      await this.costService.updateOne(costTo, cost);
    } else if (dto.type === 'INCOME') {
      const { billTo, incomeFrom } = dto;

      const bill = await this.billService.getOneById(billTo);
      bill.sum += dto.value;
      await this.billService.updateOne(billTo, bill);

      const income = await this.incomeService.getOneById(incomeFrom);
      income.sum += dto.value;
      await this.incomeService.updateOne(incomeFrom, income);
    } else if (dto.type === 'TRANSFER') {
      const { billTo, billFrom } = dto;

      const billToBD = await this.billService.getOneById(billTo);
      billToBD.sum += dto.value;
      await this.billService.updateOne(billTo, billToBD);

      const billFromBD = await this.billService.getOneById(billFrom);
      billFromBD.sum -= dto.value;
      await this.billService.updateOne(billFrom, billFromBD);
    }

    const transaction = await this.transactionModel.create(transactionData);

    return transaction;
  }

  async getAllById(userId: ObjectId): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find({ user: userId });

    return transactions;
  }
}
