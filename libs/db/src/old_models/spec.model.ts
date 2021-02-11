import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {GoodsModel} from "libs/db/models/goods.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    // toJSON: { virtuals: true }
  }
})
export class SpecModel {

  @prop({ ref: 'GoodsModel' })
  @ApiProperty({ title: '所属商品', example: '所属商品' })
  goods: GoodsModel

  @prop()
  @ApiProperty({ title: '规格描述', example: '规格描述' })
  desc: string

  @prop()
  @ApiProperty({ title: '数量描述', example: '数量描述' })
  quantity: string

  @prop()
  @ApiProperty({ title: '原价', example: '原价' })
  originalPrice: number

  @prop()
  @ApiProperty({ title: '市场价', example: '市场价' })
  sellPrice: number

}