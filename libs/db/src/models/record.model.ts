import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {UserModel} from "libs/db/models/user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})
export class RecordModel {

  @prop({
    ref: 'UserModel'
  })
  @ApiProperty({ title: '发表人', example: 'Bill' })
  userId: UserModel

  @prop()
  @ApiProperty({ title: '记录话题', example: '开始重写个人博客' })
  content: string

}