import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {

  @ApiProperty({ description: '分类名称', example: '分类名称' })
  @IsNotEmpty({ message: '分类名称是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  @IsString({ message: '分类名称为字符串类型', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly name: string


  @ApiProperty({ description: '父级分类ID', example: '5' })
  readonly parentCategory?: string


  @ApiProperty({ description: '父级以上ID集合', example: '1,2,3,4' })
  readonly grandparentCategory?: string

}