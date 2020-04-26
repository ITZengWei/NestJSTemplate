import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GoodsOnShelvesDto {

  @ApiProperty({ title: '商品ID', example: '商品ID' })
  @IsNotEmpty({ message: '商品ID是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly id: string

  @ApiProperty({ title: '商品新', example: '商品ID' })
  @IsNotEmpty({ message: '商品名称是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly name: string

}