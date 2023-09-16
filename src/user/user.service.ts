import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/all.interface';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}
  async getUserData(user: User) {
    return user;
  }
  async editUser(
    userId: string,
    dto: EditUserDto,
  ) {
    try {
      if (dto.password) {
        const hash = await argon.hash(
          dto.password,
        );
        dto.password = hash;
      }
      const user = await this.userModel.updateOne(
        { _id: userId },
        { ...dto, updatedate: Date.now() },
        {
          new: true,
          runValidators: true,
        },
      );
      return user;
    } catch (error) {
      return error;
    }
  }
  async deleteUser(userId: string) {
    try {
      const user =
        await this.userModel.findByIdAndDelete(
          userId,
        );
      return user;
    } catch (error) {
      return error;
    }
  }
}
