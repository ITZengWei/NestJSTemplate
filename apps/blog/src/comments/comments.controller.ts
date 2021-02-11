import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {CommentsService} from "./comments.service";
import {SplitPageDto} from "@app/common/dtos/split-page.dto";
import {FindArticleCommentDto} from "./dtos/find-article-comment.dto";
import {SendBlogCommentDto} from "./dtos/send-blog-comment.dto";
import {SendArticleCommentDto} from "./dtos/send-article-comment.dto";


@ApiTags('评论相关接口')
@Controller('comments')
export class CommentsController {
  constructor(
   private readonly CommentsService: CommentsService
  ) { }

  @Post('findAllByBlog')
  @ApiOperation({ summary: '获取博主留言' })
  async findAllByBlog(@Body() splitPageDto: SplitPageDto) {
    return await this.CommentsService.findAllByBlog(splitPageDto)
  }

  @Post('sendByBlog')
  @ApiOperation({ summary: '发表博主留言' })
  async sendByBlog(@Body() sendBlogCommentDto: SendBlogCommentDto) {
    return await this.CommentsService.sendByBlog(sendBlogCommentDto)
  }

  @Post('findAllByArticle')
  @ApiOperation({ summary: '获取文章留言' })
  async findAllByArticle(@Body() findArticleCommentDto: FindArticleCommentDto) {
    return await this.CommentsService.findAllByArticle(findArticleCommentDto)
  }

  @Post('sendByArticle')
  @ApiOperation({ summary: '发表文章留言' })
  async sendByArticle(@Body() sendArticleCommentDto: SendArticleCommentDto) {
    return await this.CommentsService.sendByArticle(sendArticleCommentDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除留言' })
  async remove(@Param('id') id: string) {
    return await this.CommentsService.remove(id)
  }

}
