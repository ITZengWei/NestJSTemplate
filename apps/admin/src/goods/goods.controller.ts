import { Controller, Get, Param, Post, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { Crud } from 'nestjs-mongoose-crud'
import {GoodsModel} from "libs/db/models/goods.model";
import { GoodsService } from './goods.service'
import {CreateGoodsDto} from "./dtos/create-goods.dto";
import {GoodsOnShelvesDto} from "./dtos/goods-on-shelves.dto";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {GoodsAuditDto} from "./dtos/goods-audit.dto";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {UserDocumentType} from "libs/db/models/user.model";
import {FindGoodsDto} from "./dtos/find-goods.dto";


@Crud({
  model: GoodsModel,
  routes: {
    create: false,
    update: false,
    delete: {
      decorators: [ ApiOperation({ summary: '删除商品', description: 'id 商品ID' }) ]
    },
    find: false,
    findOne: false
  }
})
@ApiTags('商品相关接口')
@Controller('goods')
export class GoodsController {

  constructor(
    private readonly GoodsService: GoodsService,
    @InjectModel(GoodsModel) private readonly model : ReturnModelType<typeof GoodsModel>

  ) {}


  @Post('list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '获取商品列表' })
  async findAll(@Body() findGoodsDto: FindGoodsDto, @CurrentUser('auth') userInfo: UserDocumentType): Promise<any> {
    // console.log(userInfo)
    return await this.GoodsService.findAll(findGoodsDto, userInfo);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取商品详情' })
  @UseGuards(AuthGuard('admin_jwt'))
  async findOne(@Param('id') id: string, @CurrentUser('auth') userInfo: UserDocumentType): Promise<any> {
    return await this.GoodsService.findOne(id);
  }

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: '添加商品' })
  @UseGuards(AuthGuard('admin_jwt'))
  async create(@Body() goodsDto: CreateGoodsDto, @CurrentUser('boos') userInfo: UserDocumentType): Promise<any> {
    console.log(goodsDto, '传过来的数据')
    return await this.GoodsService.create(goodsDto)
  }

  @Post('audit')
  @ApiBearerAuth()
  @ApiOperation({ summary: '商品审核' })
  @UseGuards(AuthGuard('admin_jwt'))
  async shopAudit(@Body() goodsDto: GoodsAuditDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    console.log(goodsDto, '传过来的数据')
    return await this.GoodsService.shopAudit(goodsDto)
  }

  @Post('on_shelves')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '商品上下架' })
  async goodsOnShelves(@Body() goodsDto: GoodsOnShelvesDto, @CurrentUser('boos') userInfo: UserDocumentType): Promise<any> {
    console.log(goodsDto, '传过来的数据')
    return await this.GoodsService.onShelves(goodsDto)
  }
}
