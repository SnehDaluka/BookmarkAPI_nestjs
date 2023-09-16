import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Get('all')
  getBookmarks(@GetUser('_id') userId: string) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('_id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Post('create')
  createBookmark(
    @GetUser('_id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  @Patch('/edit/:id')
  editBookmarkById(
    @GetUser('_id') userId: string,
    @Body() dto: EditBookmarkDto,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      dto,
      bookmarkId,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  deleteBookmarkById(
    @GetUser('_id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
