import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {UserModel} from "libs/db/models/user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    // toJSON: { virtuals: true }
  }
})
export class BoosModel {
  @prop()
  @ApiProperty({ title: '店铺名称', example: 'XX' })
  name: string

  @prop({
    ref: 'UserModel'
  })
  @ApiProperty({ title: '用户表ID', example: '110' })
  userId: UserModel

}