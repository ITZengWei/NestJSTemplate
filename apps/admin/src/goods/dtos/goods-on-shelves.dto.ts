import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GoodsOnShelvesDto {

  @ApiProperty({ title: '商品ID', example: '商品ID' })
  @IsNotEmpty({ message: '商品ID是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly id: string


  @ApiProperty({ title: '操作', example: '1 上架操作 2 下架操作 (需要商品审核通过才行)' })
  @IsNotEmpty({ message: '操作类型不能为空', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly action: string

}