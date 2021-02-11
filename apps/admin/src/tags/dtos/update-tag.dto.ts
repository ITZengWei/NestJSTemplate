import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateTagDto {

  @ApiProperty({ description: '标签ID', example: '标签ID' })
  @IsNotEmpty({ message: '标签ID', context: { errorCode:  1 } })
  readonly id: string

  @ApiProperty({ title: '标签名称', example: '标签名称' })
  name: string

  @ApiProperty({ title: '标签颜色', example: '标签颜色' })
  color: string
}