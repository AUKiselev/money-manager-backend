import { CreateIncomeDto } from './dtos/create-income.dto';
import { Income, IncomeDocument } from './schemas/income.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateIncomeDto } from './dtos/update-income.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(dto: CreateIncomeDto, addToUser = true): Promise<Income> {
    const income = await this.incomeModel.create({ ...dto, sum: 0 });

    if (addToUser) {
      this.usersService.addNewIncome(income);
    }

    return income;
  }

  async getAllById(userId: ObjectId): Promise<Income[]> {
    const incomes = await this.incomeModel.find({ user: userId });

    return incomes;
  }

  async getOne(id: ObjectId): Promise<Income> {
    const income = await this.incomeModel.findById(id);
    return income;
  }

  async updateOne(id: ObjectId, dto: UpdateIncomeDto): Promise<Income> {
    const income = await this.incomeModel.findById(id);

    if (dto.name) {
      income.name = dto.name;
    }
    if (typeof +dto.sum === 'number') {
      income.sum = dto.sum;
    }
    if (dto.icon) {
      income.icon = dto.icon;
    }

    await income.save();

    return income;
  }

  async delete(id: ObjectId): Promise<Income> {
    const income = await this.incomeModel.findByIdAndDelete(id);
    return income;
  }
}
