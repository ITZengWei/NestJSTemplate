import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {AlbumModel} from "libs/db/models/album.model";
import {UserDocumentType} from "libs/db/models/user.model";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {GamesService} from "./games.service";
import {CreateGameDto} from "./dtos/create-game.dto";
import {UpdateGameDto} from "./dtos/update-game.dto";

@ApiTags('游戏相关接口')
@Controller('games')
export class GamesController {
  constructor(
    @InjectModel(AlbumModel) private readonly model : ReturnModelType<typeof AlbumModel>,
    private readonly GamesService: GamesService
  ) {}


  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '添加游戏' })
  async create(@Body() createGameDto: CreateGameDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.GamesService.create(createGameDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除游戏' })
  async remove(@Param('id') id: string , @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.GamesService.remove(id)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '修改游戏' })
  async update(@Body() updateGameDto: UpdateGameDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.GamesService.update(updateGameDto)
  }

  @Post('fetch')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '获取游戏' })
  async find(@CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.GamesService.findAll()
  }
}
