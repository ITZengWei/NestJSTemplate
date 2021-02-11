import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateGameDto {

  @ApiProperty({ description: '游戏Id', example: '123' })
  @IsNotEmpty({ message: '游戏id 不能为空哦', context: { errorCode:  1 } })
  readonly id: string

  @ApiProperty({ title: '封面', example: '封面' })
  cover: string

  @ApiProperty({ title: '备注', example: '备注' })
  remark: string

  @ApiProperty({ title: '游戏来源', example: '游戏来源' })
  origin: string

  @ApiProperty({ title: '链接地址', example: '链接地址' })
  link: string

}