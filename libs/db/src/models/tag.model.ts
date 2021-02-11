import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class TagModel {
  @prop()
  @ApiProperty({ title: '标签名称', example: 'JavaScript' })
  name: string

  @prop()
  @ApiProperty({ title: '标签颜色', example: '#FFF2E8' })
  color: string

  @prop()
  @ApiProperty({ description: '审核状态 -1 审核不通过 0 审核中 1 审核通过', example: '-1' })
  status: string

}