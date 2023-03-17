import { CreateBillDto } from './dtos/create-bill.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Bill, BillDocument } from './schemas/bill.schema';
import { UpdateBillDto } from './dtos/update-bill.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private billModel: Model<BillDocument>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(dto: CreateBillDto, addToUser = true): Promise<Bill> {
    const bill = await this.billModel.create({ ...dto });

    if (addToUser) {
      this.usersService.addNewBill(bill);
    }

    return bill;
  }

  async getAllById(userId: ObjectId): Promise<Bill[]> {
    const bills = await this.billModel.find({ user: userId });

    return bills;
  }

  async updateOne(id: ObjectId, dto: UpdateBillDto): Promise<Bill> {
    const bill = await this.billModel.findById(id);

    if (dto.name) {
      bill.name = dto.name;
    }
    if (typeof +dto.sum === 'number') {
      bill.sum = dto.sum;
    }
    if (dto.icon) {
      bill.icon = dto.icon;
    }

    await bill.save();

    return bill;
  }

  async delete(id: ObjectId): Promise<Bill> {
    const bill = await this.billModel.findByIdAndDelete(id);
    return bill;
  }
}
