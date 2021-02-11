import { prop, modelOptions, arrayProp } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {UserModel} from "libs/db/models/user.model";
import {TagModel} from "libs/db/models/tag.model";
import {CategoryModel} from "libs/db/models/category.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class ArticleModel {

  @prop()
  @ApiProperty({ title: '标题', example: '标题' })
  title: string

  @prop()
  @ApiProperty({ title: '署名', example: '署名' })
  author: string

  @prop()
  @ApiProperty({ title: '展示图片', example: '展示图片' })
  traitImg: string


  @prop()
  @ApiProperty({ description: '审核状态 -1 审核不通过 0 审核中 1 审核通过', example: '-1' })
  status: string

  @prop()
  @ApiProperty({ description: '文章完成状态', example: true })
  completed: boolean


  @prop({
    ref: 'CategoryModel'
  })
  @ApiProperty({ title: '所属分类', example: '学习' })
  category: CategoryModel

  @arrayProp({
    ref: 'TagModel',
    // localField: '_id',
    // foreignField: 'goods'
  })
  @ApiProperty({ title: '所贴标签', example: 'JavaScript' })
  tags: Array<TagModel>

  @prop({
    ref: 'UserModel'
  })
  @ApiProperty({ title: '用户ID', example: '5' })
  userId: UserModel


  @prop()
  @ApiProperty({ title: '正文(html)', example: '正文(html)' })
  contentHTML: string

  @prop()
  @ApiProperty({ title: '正文(md)', example: '正文(md)' })
  contentMD: string

  @prop()
  @ApiProperty({ title: '总结', example: '总结' })
  summary: string

  @prop()
  @ApiProperty({ title: '阅读量', example: '10' })
  readCount: number

}