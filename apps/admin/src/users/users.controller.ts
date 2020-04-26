import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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
    delete: /*false*/ {
      decorators: [ ApiOperation({ summary: '删除用户', description: 'id 用户ID' }) ]
    },
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
  ) {}


  @Post('applyShop')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '申请成为商家' })
  applyShop(@Body() applyShopDto: ApplyShopDto, @CurrentUser('') userInfo: UserDocumentType): Promise<any> {
    return this.UsersService.applyShop(applyShopDto, userInfo)
  }

  // @Post('applyAdmin')
  // @ApiOperation({ summary: '申请成为管理员' })
  // applyAdmin() {
  //
  // }
}
