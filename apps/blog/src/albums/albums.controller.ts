import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import {AlbumModel} from "libs/db/models/album.model";
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {AlbumsService} from "./albums.service";
import {SplitPageDto} from "@app/common/dtos/split-page.dto";


@ApiTags('相册相关接口')
@Controller('albums')
export class AlbumsController {

  constructor(
    private readonly AlbumsService: AlbumsService
  ) { }

  @Post('')
  @ApiOperation({ summary: '获取相册' })
  async findAll(@Body() findAlbumDto: SplitPageDto): Promise<any> {
    return await this.AlbumsService.findAll(findAlbumDto)
  }
}
