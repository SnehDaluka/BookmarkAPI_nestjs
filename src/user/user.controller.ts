import {
  Controller,
  Get,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from 'src/interfaces/all.interface';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return this.userService.getUserData(user);
  }

  @Patch('edit')
  editUser(
    @GetUser('_id') userId: string,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  @Delete('delete')
  deleteUser(@GetUser('_id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
