import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator'


export const CreateArticleDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class CreateRecordDto {

  @ApiProperty({ title: '记录话题', example: '记录话题' })
  @IsNotEmpty({ message: '记录话题不能为空', context: { errorCode: -1 } })
  content: string
}