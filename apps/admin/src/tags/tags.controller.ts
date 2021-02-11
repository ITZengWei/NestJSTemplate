import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {TagModel} from "libs/db/models/tag.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {TagsService} from "./tags.service";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {UserDocumentType} from "libs/db/models/user.model";
import {CreateTagDto} from "./dtos/create-tag.dto";
import {UpdateTagDto} from "./dtos/update-tag.dto";
import {FindTagDto} from "./dtos/find-tag.dto";
import {AuthTagDto} from "./dtos/auth-tag.dto";


const initData = [{"name":"Java","color":"rgba(110,109,11,.8)"},{"name":"Spring","color":"rgba(149,178,108,.8)"},{"name":"Oracle","color":"rgba(51,220,14,.8)"},{"name":"Jquery","color":"rgba(110,5,124,.8)"},{"name":"Layui","color":"rgba(232,107,194,.8)"},{"name":"Bootstrap","color":"rgba(236,248,70,.8)"},{"name":"生活","color":"rgba(103,110,121,.8)"},{"name":"英雄联盟","color":"rgba(246,1,6,.8)"},{"name":"手机","color":"rgba(148,90,181,.8)"},{"name":"音乐","color":"rgba(163,154,177,.8)"},{"name":"电影","color":"rgba(137,191,48,.8)"},{"name":"Tomcat","color":"rgba(244,22,254,.8)"},{"name":"Mysql","color":"rgba(95,200,254,.8)"},{"name":"Sql Server","color":"rgba(55,179,34,.8)"},{"name":"阅读","color":"rgba(181,21,248,.8)"},{"name":"Javascript","color":"rgba(122,175,243,.8)"},{"name":"Jetbrains","color":"rgba(108,217,170,.8)"},{"name":"编辑器","color":"rgba(222,77,240,.8)"},{"name":"经验","color":"rgba(81,61,205,.8)"},{"name":"Vue","color":"rgba(87,106,19,.8)"},{"name":"React","color":"rgba(48,120,85,.8)"},{"name":"组件","color":"rgba(132,146,222,.8)"},{"name":"Webpack","color":"rgba(25,182,208,.8)"},{"name":"markerdown","color":"rgba(76,137,236,.8)"},{"name":"在线工具","color":"rgba(169,72,234,.8)"},{"name":"Webstorm","color":"rgba(16,144,195,.8)"},{"name":"idea","color":"rgba(58,174,176,.8)"},{"name":"Html","color":"rgba(37,62,78,.8)"},{"name":"小程序","color":"rgba(243,195,73,.8)"},{"name":"Ngnix","color":"rgba(233,232,108,.8)"},{"name":"服务器","color":"rgba(166,47,162,.8)"},{"name":"建站","color":"rgba(23,133,43,.8)"},{"name":"GIT","color":"rgba(100,116,43,.8)"},{"name":"SVN","color":"rgba(13,192,114,.8)"},{"name":"Linux","color":"rgba(7,148,233,.8)"},{"name":"Windows","color":"rgba(54,114,218,.8)"},{"name":"脚手架","color":"rgba(199,46,227,.8)"},{"name":"Ubuntu","color":"rgba(152,140,247,.8)"},{"name":"es6","color":"rgba(55,178,155,.8)"},{"name":"正则","color":"rgba(202,193,185,.8)"},{"name":"vscode","color":"rgba(44,248,151,.8)"},{"name":"typescript","color":"rgba(110,225,169,.8)"},{"name":"算法","color":"rgba(156,111,248,.8)"},{"name":"bug","color":"rgba(16,144,136,.8)"},{"name":"nodejs","color":"rgba(247,18,151,.8)"},{"name":"express","color":"rgba(43,117,119,.8)"},{"name":"koa","color":"rgba(169,66,174,.8)"},{"name":"docker","color":"rgba(89,131,42,.8)"},{"name":"centos","color":"rgba(241,190,252,.8)"},{"name":"chrome插件","color":"rgba(196,204,49,.8)"},{"name":"Mac","color":"rgba(159,91,139,.8)"},{"name":"yarn","color":"rgba(2,33,119,.8)"},{"name":"npm","color":"rgba(10,44,216,.8)"},{"name":"依赖","color":"rgba(252,116,100,.8)"}]

@ApiTags('标签相关接口')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly TagsService: TagsService,
    @InjectModel(TagModel) private readonly model : ReturnModelType<typeof TagModel>
  ) { }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '添加标签' })
  async create(@Body() createTagDto: CreateTagDto, @CurrentUser('') userInfo: UserDocumentType): Promise<any> {
    console.log(createTagDto, '传过来的数据')
    return await this.TagsService.create(createTagDto)
  }


  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除标签' })
  async remove(@Param('id') id: string , @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.TagsService.remove(id)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '修改标签' })
  async update(@Body() updateTagDto: UpdateTagDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    console.log(updateTagDto, '传过来的数据')
    return await this.TagsService.update(updateTagDto)
  }

  @Post('fetch')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '用户获取标签' })
  async findAll(@Body() findTagDto : FindTagDto, @CurrentUser('') userInfo: UserDocumentType) {
    return await this.TagsService.findAll(findTagDto)
  }

  @Post('fetchByAdmin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '管理员获取标签' })
  async findAllByAdmin(@Body() findTagDto : FindTagDto, @CurrentUser('admin') userInfo: UserDocumentType) {
    return await this.TagsService.findAllByAdmin(findTagDto)
  }

  @Post('auth')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '审核标签' })
  async auth(@Body() authTagDto : AuthTagDto, @CurrentUser('admin') userInfo: UserDocumentType) {
    return await this.TagsService.auth(authTagDto)
  }

}
