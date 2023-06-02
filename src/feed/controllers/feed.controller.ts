import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Request,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { JwtGuard } from '../../auth/guard/jwt.guard';
  import { DeleteResult, UpdateResult } from 'typeorm';
  import { IsCreatorGuard } from '../guards/is-creator.guard';
import { FeedPost } from '../models/postInterface';
import { FeedService } from '../sevices/feed.service';
  
  @Controller('feed')
  export class FeedController {
    constructor(private feedService: FeedService) {}
  
    // @Roles(Role.ADMIN, Role.PREMIUM)
    // @UseGuards(JwtGuard, RolesGuard)
    @UseGuards(JwtGuard)
    @Post()
    create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
      return this.feedService.createPost(req.user, feedPost);
    }
    // @UseGuards(JwtGuard)
    // @Get('all')
    // findAll(): Observable<FeedPost[]> {
    //   return this.feedService.findAllPosts();
    // }
  
    @UseGuards(JwtGuard)
    @Get()
    findSelected(
      @Query('take') take: number = 1,
      @Query('skip') skip: number = 1,
    ): Observable<FeedPost[]> {
      take = take > 20 ? 20 : take;
      return this.feedService.findPosts(take, skip);
    }
  
    @UseGuards(JwtGuard, IsCreatorGuard)
    @Put(':id')
    update(
      @Param('id') id: number,
      @Body() feedPost: FeedPost,
    ): Observable<UpdateResult> {
      return this.feedService.updatePost(id, feedPost);
    }
  
    @UseGuards(JwtGuard, IsCreatorGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
      return this.feedService.deletePost(id);
    }
  
    @Get('image/:fileName')
    findImageByName(@Param('fileName') fileName: string, @Res() res) {
      if (!fileName || ['null', '[null]'].includes(fileName)) return;
      return res.sendFile(fileName, { root: './images' });
    }




    @Patch(':id/like')
    async likePost(@Param('id') id: number) {
      return this.feedService.likePost(id);
    }

  }
  