import { CreateBillDto } from './dtos/create-bill.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Bill, BillDocument } from './schemas/bill.schema';
import { UpdateBillDto } from './dtos/update-bill.dto';

@Injectable()
export class BillService {
  constructor(@InjectModel(Bill.name) private billModel: Model<BillDocument>) {}

  async create(dto: CreateBillDto): Promise<Bill> {
    const bill = await this.billModel.create({ ...dto, icon: '' });
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
    if (dto.sum) {
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
