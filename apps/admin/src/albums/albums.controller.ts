import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {AlbumModel} from "libs/db/models/album.model";
import {UserDocumentType} from "libs/db/models/user.model";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {AlbumsService} from "./albums.service";
import {CreateAlbumDto} from "./dtos/create-album.dto";
import {UpdateAlbumDto} from "./dtos/update-album.dto";
import {FindAlbumDto} from "./dtos/find-album.dto";


@ApiTags('相册相关接口')
@Controller('albums')
export class AlbumsController {

  constructor(
    @InjectModel(AlbumModel) private readonly model : ReturnModelType<typeof AlbumModel>,
    private readonly AlbumsService: AlbumsService
  ) {}


  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '添加相册' })
  async create(@Body() createAlbumDto: CreateAlbumDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.AlbumsService.create(createAlbumDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除相册' })
  async remove(@Param('id') id: string , @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.AlbumsService.remove(id)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '修改相册' })
  async update(@Body() updateAlbumDto: UpdateAlbumDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.AlbumsService.update(updateAlbumDto)
  }

  @Post('fetch')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '获取相册' })
  async find(@Body() findAlbumDto: FindAlbumDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.AlbumsService.findAll(findAlbumDto)
  }

}
