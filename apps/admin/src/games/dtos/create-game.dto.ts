import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator'


export const CreateArticleDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class CreateGameDto {

  @ApiProperty({ title: '封面', example: '封面' })
  @IsNotEmpty({ message: '封面不能为空', context: { errorCode: -1 } })
  cover: string

  @ApiProperty({ title: '备注', example: '备注' })
  @IsNotEmpty({ message: '备注不能为空', context: { errorCode: -1 } })
  remark: string

  @ApiProperty({ title: '游戏来源', example: '游戏来源' })
  @IsNotEmpty({ message: '游戏来源不能为空', context: { errorCode: -1 } })
  origin: string

  @ApiProperty({ title: '链接地址', example: '链接地址' })
  @IsNotEmpty({ message: '链接地址不能为空', context: { errorCode: -1 } })
  link: string


}