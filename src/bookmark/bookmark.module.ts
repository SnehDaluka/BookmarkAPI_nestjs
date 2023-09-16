import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookMarkSchema,
  UserSchema,
} from 'src/schemas/all.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Bookmark',
        schema: BookMarkSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
