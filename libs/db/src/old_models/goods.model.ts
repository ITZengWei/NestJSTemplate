import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {CategoryModel} from "libs/db/models/category.model";
import {SpecModel} from "libs/db/models/spec.model";
import {UserModel} from "libs/db/models/user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true }
  }
})
export class GoodsModel {

  @prop({
    ref: 'UserModel'
  })
  @ApiProperty({ title: '商家名称', example: 'bill' })
  userId: UserModel


  @prop()
  @ApiProperty({ title: '商品名称', example: '苹果' })
  name: string

  @prop()
  @ApiProperty({ title: '品牌', example: '富士康' })
  brand: string

  @prop()
  @ApiProperty({ title: '缩略图', example: 'xxx.jpg' })
  thumbnail: string

  @prop({})
  @ApiProperty({ title: '图文列表 > 3', example: '图文列表 > 3' })
  imageList: Array<string>



  @prop({
    ref: 'CategoryModel'

    // localField: 'category',
    // foreignField: '_id' // 不能加
  })
  @ApiProperty({ title: '所属分类', example: '水果' })
  category: CategoryModel


  @arrayProp({
    ref: 'SpecModel',
    localField: '_id',
    foreignField: 'goods'
  })
  @ApiProperty({ title: '规格', example: '描述,数量,原价,现价' })
  skuArray: Array<SpecModel>

  @prop()
  @ApiProperty({ description: '审核状态 -1 审核不通过 0 审核中 1 审核通过', example: '-1' })
  audit: string

  @prop()
  @ApiProperty({ description: '上架状态  1 上架 2 下架', example: '-1' })
  status: string

  @prop()
  @ApiProperty({ title: '商品描述', example: '商品描述' })
  desc: string
}