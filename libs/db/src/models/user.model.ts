import { prop, modelOptions, DocumentType } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'

export type UserDocumentType = DocumentType<UserModel>


@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class UserModel {
  @prop()
  @ApiProperty({ description: '账号', example: 'Bill' })
  account: string

  @prop()
  @ApiProperty({ description: '手机号码', example: '13407943933' })
  tel: string

  @prop()
  @ApiProperty({ description: '微信标识', example: 'weixin' })
  openid: string


  @prop({
    select: false,
    get: (val) => val,
    set: (val) => val ? hashSync(val, 12) : val
  })
  @ApiProperty({ description: '密码', example: '110349' })
  psw: string


  @prop()
  @ApiProperty({ description: '审核状态 -1 审核不通过 0 审核中 1 审核通过', example: '-1' })
  audit: string

  @prop()
  @ApiProperty({ description: '用户类型 0 普通 1 初级管理员 2 高级管理员', example: '0' })
  type: string


  @prop()
  @ApiProperty({ description: '性别 -1 保密 0 女 1 男', example: '-1' })
  sex: string

  @prop()
  @ApiProperty({ description: '昵称', example: '陌琼' })
  nickname: string

  @prop()
  @ApiProperty({ description: '头像', example: '头像' })
  avatar: string
}