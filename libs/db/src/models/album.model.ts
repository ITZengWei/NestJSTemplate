import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {UserModel} from "libs/db/models/user.model";
import {ImageModel} from "libs/db/models/image.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})
export class AlbumModel {

  // @prop({
  //   ref: 'UserModel'
  // })
  // @ApiProperty({ title: '发表人', example: 'Bill' })
  // userId: UserModel

  // @prop({
  //   ref: 'ImageModel'
  // })
  // @ApiProperty({ title: '图景', example: 'image' })
  // prospect: ImageModel

  @prop()
  @ApiProperty({ title: '图景', example: 'image' })
  prospect: string

  @prop()
  @ApiProperty({ title: '备注', example: '好美的风景' })
  remark: string

}