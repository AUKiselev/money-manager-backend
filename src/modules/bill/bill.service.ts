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
    const bill = await this.billModel.create({ ...dto });

    return bill;
  }

  async getAllByUserId(userId: ObjectId): Promise<Bill[]> {
    const bills = await this.billModel.find({ user: userId });

    return bills;
  }

  async getOneById(billId: ObjectId): Promise<Bill> {
    const bill = await this.billModel.findById(billId);

    return bill;
  }

  async updateOne(id: ObjectId, dto: UpdateBillDto): Promise<Bill> {
    const bill = await this.billModel.findById(id);

    if (dto.name) {
      bill.name = dto.name;
    }
    if (!Number.isNaN(+dto.sum)) {
      bill.sum = dto.sum;
    }
    if (dto.settings && Object.keys(dto.settings).length) {
      const settingsKeys = Object.keys(dto.settings);

      settingsKeys.forEach((key) => {
        if (dto.settings[key]) bill.settings[key] = dto.settings[key];
      });
    }

    await bill.save();

    return bill;
  }

  async delete(id: ObjectId): Promise<Bill> {
    const bill = await this.billModel.findByIdAndDelete(id);
    return bill;
  }
}
