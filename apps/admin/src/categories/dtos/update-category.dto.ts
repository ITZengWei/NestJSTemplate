import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCategoryDto {

  @ApiProperty({ description: '分类ID', example: '分类ID' })
  @IsNotEmpty({ message: '分类ID', context: { errorCode:  1 } })
  readonly id: string

  @ApiProperty({ description: '分类名称', example: '分类名称' })
  @IsNotEmpty({ message: '分类名称是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  @IsString({ message: '分类名称为字符串类型', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly name: string

}