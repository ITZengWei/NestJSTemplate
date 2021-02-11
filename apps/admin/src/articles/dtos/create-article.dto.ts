import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'


export const CreateArticleDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class CreateArticleDto {

  @ApiProperty({ title: '标题', example: 'Bill' })
  @IsNotEmpty({ message: '标题不能为空', context: { errorCode: -1 } })
  title: string

  @IsNotEmpty({ message: '署名不能为空', context: { errorCode: -1 } })
  @ApiProperty({ title: '署名', example: '110349' })
  author: string

  @ApiProperty({ title: '展示图片', example: 'https://zbfcqtl-1252753142.cos.ap-chengdu.myqcloud.com/bg/5.jpg' })
  traitImg: string

  @IsNotEmpty({ message: '所属分类不能为空', context: { errorCode: -1 } })
  @ApiProperty({ title: '所属分类', example: '5ea59f39ac69545c18859761' })
  category: string

  @ApiProperty({ title: '标签', example: '["5ea90ea159766b2cb8ccde4a"]' })
  tags: any[]

  @IsNotEmpty({ message: '正文(html)不能为空', context: { errorCode: -1 } })
  @ApiProperty({ title: '正文(html)', example: '正文(html)' })
  contentHTML: string


  @ApiProperty({ title: '正文(md)', example: '正文(md)' })
  contentMD: string

  @IsNotEmpty({ message: '总结不能为空', context: { errorCode: -1 } })
  @ApiProperty({ title: '总结', example: '总结' })
  summary: string

  @IsNotEmpty({ message: '文章完成状态不能为空', context: { errorCode: -1 } })
  // @IsBoolean({ message: '只能为Boolean', context: { errorCode: -1 } })
  @ApiProperty({ title: '完成状态', example: true })
  @Type((val) => Boolean)
  completed: boolean

}