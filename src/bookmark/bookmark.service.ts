import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookMark,
  User,
} from 'src/interfaces/all.interface';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel('Bookmark')
    private bookmarkModel: Model<BookMark>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async getBookmarks(userId: string) {
    try {
      const data = await this.bookmarkModel.find({
        user: userId,
      });
      if (!data.length) {
        return 'No bookmarks found for the user';
      }
      return data;
    } catch (error) {
      const e = new ForbiddenException(
        'Bookmark Not Found',
      );
      return e;
    }
  }

  async getBookmarkById(
    userId: string,
    bookmarkId: string,
  ) {
    try {
      const data =
        await this.bookmarkModel.findOne({
          _id: bookmarkId,
          user: userId,
        });
      if (!data) {
        return 'No bookmark found for the user';
      }
      return data;
    } catch (error) {
      const e = new ForbiddenException(
        'Bookmark Not Found',
      );
      return e;
    }
  }

  async createBookmark(
    userId: string,
    dto: CreateBookmarkDto,
  ) {
    try {
      if (!dto.title) {
        throw new ForbiddenException(
          'Title not found',
        );
      }
      if (!dto.link) {
        throw new ForbiddenException(
          'Link not found',
        );
      }
      const bookmark = new this.bookmarkModel({
        ...dto,
        user: userId,
      });
      const data = await bookmark.save();

      return data;
    } catch (error) {
      return error;
    }
  }

  async editBookmarkById(
    userId: string,
    dto: EditBookmarkDto,
    bookmarkId: string,
  ) {
    try {
      const data =
        await this.bookmarkModel.updateOne(
          {
            _id: bookmarkId,
            user: userId,
          },
          {
            ...dto,
            updatedate: Date.now(),
          },
        );
      return data;
    } catch (error) {
      const e = new ForbiddenException(
        'Bookmark Not Found',
      );
      return e;
    }
  }

  async deleteBookmarkById(
    userId: string,
    bookmarkId: string,
  ) {
    try {
      const data =
        await this.bookmarkModel.deleteOne({
          _id: bookmarkId,
          user: userId,
        });
      return data;
    } catch (error) {
      const e = new ForbiddenException(
        'Bookmark Not Found',
      );
      return e;
    }
  }
}
