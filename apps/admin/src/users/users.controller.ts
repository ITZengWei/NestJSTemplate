import { Controller, Post, Body, UseGuards, Get, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose'
import { AuthGuard } from '@nestjs/passport'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserDocumentType, UserModel} from "libs/db/models/user.model";
import {UsersService} from "./users.service";
import {ApplyShopDto} from "./dtos/apply-shop.dto";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";


@Crud({
  model: UserModel,
  routes: {
    create:  false,
    delete: false,
    update: false/*{
      decorators: [ ApiOperation({ summary: '修改用户', description: 'id 用户ID' }) ]
    }*/,
    find: {
      decorators: [ ApiOperation({ summary: '用户列表', description: 'id 商品ID' }) ]
    },
    findOne: false/*{
      decorators: [ ApiOperation({ summary: '用户详情', description: 'id 用户ID' }) ]
    }*/,
  }
})
@ApiTags('用户相关接口')
@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(UserModel) private readonly model : ReturnModelType<typeof UserModel>,
    private readonly UsersService: UsersService
  ) { }

  @Get('findAll')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '管理员获取用户列表' })
  async findAllUser(@CurrentUser('admin') user: UserDocumentType) {
    return await this.UsersService.findAllUser()
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string, @CurrentUser('admin') user: UserDocumentType) {
    return await this.UsersService.remove(id)
  }

}
