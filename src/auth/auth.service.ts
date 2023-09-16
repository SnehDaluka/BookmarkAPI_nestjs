import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/all.interface';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      //generate the password
      const hash = await argon.hash(dto.password);

      //save the new user in the db
      const user = new this.userModel({
        email: dto.email,
        hash,
      });

      //return the saved user
      const data = await user.save();
      return this.signToken(
        user._id.toString(),
        user.email,
      );
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException(
          'Credentials taken already',
        );
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    try {
      //find the user by email
      const user = await this.userModel.findOne({
        email: dto.email,
      });
      if (!user)
        throw new ForbiddenException(
          'Incorrect Credentials',
        );

      //if password incorrect throw exception
      const matches = await argon.verify(
        user.hash,
        dto.password,
      );

      //send back the user
      if (!matches)
        throw new ForbiddenException(
          'Incorrect Credentials',
        );

      return this.signToken(
        user._id.toString(),
        user.email,
      );
    } catch (error) {
      throw error;
    }
  }
  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      email,
    };

    const Secret =
      this.configService.get<string>(
        'JWT_SECRET',
      );
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '45m',
        secret: Secret,
      },
    );

    return { access_token: token };
  }
}
