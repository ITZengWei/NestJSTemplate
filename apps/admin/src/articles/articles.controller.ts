import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {ArticleModel} from "libs/db/models/article.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {TagModel} from "libs/db/models/tag.model";
import {ArticlesService} from "./articles.service";
import {UserDocumentType} from "libs/db/models/user.model";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {CreateArticleDto} from "./dtos/create-article.dto";
import {UpdateArticleDto} from "./dtos/update-article.dto";
import {FindArticleDto} from "./dtos/find-article.dto";
import {AuthArticleDto} from "./dtos/auth-article.dto";

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

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '添加文章' })
  async create(@Body() createArticleDto: CreateArticleDto, @CurrentUser('') userInfo: UserDocumentType) {
    return await this.ArticlesService.create(createArticleDto, userInfo)
  }


  @Post('auth')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '审核文章' })
  async auth(@Body() authArticleDto: AuthArticleDto, @CurrentUser('admin') userInfo: UserDocumentType) {
    return await this.ArticlesService.auth(authArticleDto)
  }


  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string , @CurrentUser('') userInfo: UserDocumentType): Promise<any> {
    return await this.ArticlesService.remove(id)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '修改文章' })
  async update(@Body() updateArticleDto: UpdateArticleDto, @CurrentUser('') userInfo: UserDocumentType): Promise<any> {
    return await this.ArticlesService.update(updateArticleDto)
  }

  @Post('/fetchByAdmin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '管理员获取所有文章' })
  async findByAdmin(@Body() findArticleDto : FindArticleDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.ArticlesService.findByAdmin(findArticleDto)
  }


  @Post('fetchByUser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '获取用户所属文章' })
  async findByUser(@Body() findArticleDto : FindArticleDto, @CurrentUser('') userInfo: UserDocumentType): Promise<any> {
    return await this.ArticlesService.findByUser(findArticleDto, userInfo)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '获取文章详情' })
  async findArticle(@Param('id') id: string, @CurrentUser('') userInfo: UserDocumentType): Promise<any> {
    return await this.ArticlesService.findArticle(id)
  }

  //
  // @Post('updateCompleted')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('admin_jwt'))
  // @ApiOperation({ summary: '更新所有的文章完成状态(测试)' })
  // async updateCompleted(@CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
  //   const articles = await this.model.find()
  //   articles.forEach(async article => {
  //     await this.model.findByIdAndUpdate(article.id, {
  //       completed: true
  //     })
  //   })
  //
  //   return {
  //     msg: '成功'
  //   }
  // }

}