import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {CategoryModel} from "libs/db/models/category.model";

export class CreateGoodsDto {

  @ApiProperty({ description: '商品名称', example: '商品名称' })
  @IsNotEmpty({ message: '商品名称是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  @IsString({ message: '商品名称为字符串类型', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly name: string

  @ApiProperty({ description: '商品名牌', example: '商品名牌' })
  @IsNotEmpty({ message: '品牌是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  @IsString({ message: '品牌为字符串类型', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly brand: string


  @ApiProperty({ description: '商品展览图片列表', example: '[1,2, 3, 4]' })
  @IsNotEmpty({ message: '请传入图片列表', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly imageList: Array<string>

  @ApiProperty({ description: '分类ID', example: '123' })
  @IsNotEmpty({ message: '请传入分类ID', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly category: CategoryModel

  @ApiProperty({ title: '商品描述', example: '商品描述' })
  @IsNotEmpty({ message: '请传入商品描述', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly desc: string
}