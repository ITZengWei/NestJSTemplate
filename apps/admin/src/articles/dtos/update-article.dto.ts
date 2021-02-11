import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateArticleDto {

  @ApiProperty({ description: '文章ID', example: '文章ID' })
  @IsNotEmpty({ message: '文章ID', context: { errorCode:  1 } })
  readonly id: string


  @ApiProperty({ title: '标题', example: 'Bill' })
  title: string

  @ApiProperty({ title: '署名', example: '110349' })
  author: string

  @ApiProperty({ title: '展示图片', example: 'https://zbfcqtl-1252753142.cos.ap-chengdu.myqcloud.com/bg/5.jpg' })
  traitImg: string

  @ApiProperty({ title: '所属分类', example: '5ea59e742db252623055aeca' })
  category: string

  @ApiProperty({ title: '标签', example: '[5ea59e742db252623055aecd, 5ea59e742db252623055aecf]' })
  tags: any[]

  @ApiProperty({ title: '正文(html)', example: '正文(html)' })
  contentHTML: string


  @ApiProperty({ title: '正文(md)', example: '正文(md)' })
  contentMD: string

  // @IsBoolean({ message: '只能为Boolean', context: { errorCode: -1 } })
  @ApiProperty({ title: '完成状态', example: '完成状态(true)' })
  @Type((val) => Boolean)
  completed: boolean

  @ApiProperty({ title: '总结', example: '总结' })
  summary: string

}