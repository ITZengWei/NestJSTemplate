import { prop, modelOptions, DocumentType } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'
import {UserModel} from "libs/db/models/user.model";
import {ArticleModel} from "libs/db/models/article.model";


@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class CommentModel {
  @prop()
  @ApiProperty({ description: '评论内容', example: 'Bill' })
  content: string

  @prop()
  @ApiProperty({ description: '来自哪里', example: '博客' })
  from: string


  @prop()
  @ApiProperty({ description: '是否显示', example: '0隐藏 ,1 显示' })
  status: string

  @prop({
    ref: 'UserModel'
  })
  @ApiProperty({ description: '用户Id', example: 'Bill' })
  userId: UserModel

  @prop()
  @ApiProperty({ description: '评论类型', example: '1 博客留言 ,2 文章留言' })
  commentType: string

  @prop({
    ref: 'ArticleModel'
  })
  @ApiProperty({ description: '所属文章', example: '评论文章' })
  article: ArticleModel

  @prop()
  @ApiProperty({ description: '上级评论', example: '' })
  top: this

}