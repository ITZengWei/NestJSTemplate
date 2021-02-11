import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateRecordDto {

  @ApiProperty({ description: '记录ID', example: '记录ID' })
  @IsNotEmpty({ message: '记录ID', context: { errorCode:  1 } })
  readonly id: string

  @ApiProperty({ title: '记录话题', example: '记录话题' })
  content: string
}