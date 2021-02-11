import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthTagDto {

  @ApiProperty({ description: '标签ID', example: '标签ID' })
  @IsNotEmpty({ message: '标签ID', context: { errorCode:  1 } })
  readonly id: string

  @ApiProperty({ title: '审核状态', example: '审核状态 -1 审核不通过 0 审核中 1 审核通过' })
  @IsNotEmpty({ message: '审核状态不能为空', context: { errorCode:  1 } })
  status: string

}