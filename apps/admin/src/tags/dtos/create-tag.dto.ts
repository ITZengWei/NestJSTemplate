import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator'


export const CreateArticleDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class CreateTagDto {

  @ApiProperty({ title: '标签名称', example: '标签名称' })
  @IsNotEmpty({ message: '标签名称不能为空', context: { errorCode: -1 } })
  name: string

  /** 标签颜色 */
  @ApiProperty({ title: '标签颜色', example: '标签颜色' })
  @IsNotEmpty({ message: '标签颜色不能为空', context: { errorCode: -1 } })
  color: string
}