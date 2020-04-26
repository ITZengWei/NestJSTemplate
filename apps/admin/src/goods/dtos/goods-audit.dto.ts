import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GoodsAuditDto {

  @ApiProperty({ title: '商品ID', example: '商品ID' })
  @IsNotEmpty({ message: '商品ID是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly id: string


  @ApiProperty({ title: '审核状态', example: '审核状态 -1 审核不通过 1 审核通过' })
  @IsNotEmpty({ message: '操作类型不能为空', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly audit: string

}