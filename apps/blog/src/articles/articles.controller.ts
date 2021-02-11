import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {ArticleModel} from "libs/db/models/article.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {TagModel} from "libs/db/models/tag.model";
import {ArticlesService} from "./articles.service";
import {SplitPageDto} from "@app/common/dtos/split-page.dto";
import {FindArticleTagDto} from "./dtos/find-article-tag.dto";
import {FindArticleCategoryDto} from "./dtos/find-article-category.dto";
//
// @Crud({
//   model: ArticleModel
// })
@ApiTags('文章相关接口')
@Controller('articles')
export class ArticlesController {
  constructor(
    @InjectModel(ArticleModel) private readonly model : ReturnModelType<typeof ArticleModel>,
    @InjectModel(TagModel) private readonly TagModel,
    private readonly ArticlesService: ArticlesService
  ) {
    // this.init()
  }

  async init() {
    // this.model.insertMany([])
  }

  @Post('findAll')
  @ApiOperation({ summary: '查找文章列表' })
  async findAll(@Body() splitPageDto: SplitPageDto) {
    return await this.ArticlesService.findAll(splitPageDto)
  }

  @Post('findByTag')
  @ApiOperation({ summary: '根据标签 查找文章列表' })
  async findAllByTag(@Body() findArticleTagDto: FindArticleTagDto) {
    return await this.ArticlesService.findAllByTag(findArticleTagDto)
  }

  @Post('findByCategory')
  @ApiOperation({ summary: '根据分类 查找文章列表' })
  async findAllByCategory(@Body() findArticleCategoryDto: FindArticleCategoryDto) {
    return await this.ArticlesService.findAllByCategory(findArticleCategoryDto)
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID 获取文章详情' })
  async findById(@Param('id') id: string) {
    return await this.ArticlesService.findById(id)
  }

  @Get('addRead/:id')
  @ApiOperation({ summary: '增加阅读数' })
  async addReadCount(@Param('id') id: string) {
    return await this.ArticlesService.addReadCount(id)
  }

}
