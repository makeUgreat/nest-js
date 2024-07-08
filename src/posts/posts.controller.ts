import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { User } from '../users/decorator/users.decorator';
import { UsersModel } from '../users/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // @Post()
  // @UseGuards(AccessTokenGuard)
  // postPosts(
  //   @Request() req: any,
  //   @Body('title') title: string,
  //   @Body('content') content: string,
  // ) {
  //   const authorId = req.user.id;
  //   return this.postsService.createPost(authorId, title, content);
  // }

  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(
    @User() user: UsersModel,
    @Body() body: CreatePostDto,
    // @Body('title') title: string,
    // @Body('content') content: string,
  ) {
    return this.postsService.createPost(user.id, body);
  }

  // @Post()
  // @UseGuards(AccessTokenGuard)
  // postPosts(
  //   @User('id') user: number,
  //   @Body('title') title: string,
  //   @Body('content') content: string,
  // ) {
  //   return this.postsService.createPost(user, title, content);
  // }

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, title, content);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
