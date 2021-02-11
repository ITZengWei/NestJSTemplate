import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class GameModel {
  @prop()
  @ApiProperty({ title: '游戏封面', example: 'xxx' })
  cover: string

  @prop()
  @ApiProperty({ title: '游戏备注', example: '#FFF2E8' })
  remark: string

  @prop()
  @ApiProperty({ title: '游戏来源', example: '#FFF2E8' })
  origin: string

  @prop()
  @ApiProperty({ title: '游戏链接', example: '#FFF2E8' })
  link: string
}