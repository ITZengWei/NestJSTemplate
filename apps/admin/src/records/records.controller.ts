import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {RecordModel} from "libs/db/models/record.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserDocumentType} from "libs/db/models/user.model";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {CreateRecordDto} from "./dtos/create-record.dto";
import {RecordsService} from "./records.service";
import {UpdateRecordDto} from "./dtos/update-record.dto";


@ApiTags('记录相关接口')
@Controller('records')
export class RecordsController {
  constructor(
    @InjectModel(RecordModel) private readonly model : ReturnModelType<typeof RecordModel>,
    private readonly RecordsService: RecordsService
  ) { }


  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '添加记录' })
  async create(@Body() createRecordDto: CreateRecordDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    console.log(createRecordDto, '传过来的数据')
    return await this.RecordsService.create(createRecordDto, userInfo)
  }


  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除记录' })
  async remove(@Param('id') id: string, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.RecordsService.remove(id)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '修改记录' })
  async update(@Body() updateAlbumDto: UpdateRecordDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    console.log(updateAlbumDto, '传过来的数据')
    return await this.RecordsService.update(updateAlbumDto)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '获取所有记录' })
  async findAll(@CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.RecordsService.findAll()
  }

  @Post('init/:pwd')
  @ApiOperation({ summary: '初始化' })
  async init(@Param('pwd') pwd: number): Promise<any> {

    if (pwd !== 110349) return { msg: '密码输入错误' }

    await this.model.deleteMany({})

    return {
      code: 200,
      data: await this.model.find()
    }

    return {
      msg: '成功'
    }
  }

}