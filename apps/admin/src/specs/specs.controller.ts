import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {SpecModel} from "libs/db/models/spec.model";
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

// @Crud({
//   model: SpecModel,
//   routes: {
//     create: false,
//     update: false,
//     delete: {
//       decorators: [ ApiOperation({ summary: '删除商品', description: 'id 商品ID' }) ]
//     },
//     find: false,
//     findOne: false
//   }
// })
@Crud({ // todo 如果不是 商家 我们就不让它 添加 暂时 只验证 TOKEN
  model: SpecModel,
  routes: {
    create: {
      decorators: [
        ApiOperation({ summary: '增加规格', description: 'id 商品ID' }),
        ApiBearerAuth(), UseGuards(AuthGuard('admin_jwt'))
      ]
    },
    delete: {
      decorators: [
        ApiOperation({ summary: '删除规格', description: 'id 规格ID' }),
        ApiBearerAuth(), UseGuards(AuthGuard('admin_jwt'))
      ]
    },
    update: {
      decorators: [
        ApiOperation({ summary: '修改规格', description: 'id 规格ID' }),
        ApiBearerAuth(), UseGuards(AuthGuard('admin_jwt'))
      ]
    },
    find: {
      decorators: [
        ApiOperation({ summary: '查找属于该商品所有的规格', description: 'id 商品ID' }),
        ApiBearerAuth(), UseGuards(AuthGuard('admin_jwt'))
      ]
    },
    findOne: {
      decorators: [
        ApiOperation({ summary: '查找单独规格', description: 'id 规格ID' }),
        ApiBearerAuth(), UseGuards(AuthGuard('admin_jwt'))
      ]
    },
  }
})
@ApiTags('商品规格相关接口')
@Controller('specs')
export class SpecsController {
    constructor(
      @InjectModel(SpecModel) private readonly model : ReturnModelType<typeof SpecModel>
    ) {}
}
