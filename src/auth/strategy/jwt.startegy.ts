import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { User } from 'src/interfaces/all.interface';

@Injectable({})
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    @InjectModel('User')
    private UserModel: Model<User>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    const data = await this.UserModel.findOne({
      _id: payload.id,
    });

    return data;
  }
}
