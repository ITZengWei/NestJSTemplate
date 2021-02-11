import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator'


export const CreateArticleDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class SendBlogCommentDto {

  @ApiProperty({ title: '评论内容', example: '评论内容' })
  @IsNotEmpty({ message: '评论内容不能为空', context: { errorCode: -1 } })
  content: string

  @ApiProperty({ title: '来自哪里', example: '来自哪里' })
  @IsNotEmpty({ message: '来自哪里不能为空', context: { errorCode: -1 } })
  from: string

  // @ApiProperty({ title: '发表人Id', example: '发表人Id' })
  // @IsNotEmpty({ message: '发表人Id不能为空', context: { errorCode: -1 } })
  // userId: string

  @ApiProperty({ title: '上级评论', example: '上级评论' })
  top: string
}