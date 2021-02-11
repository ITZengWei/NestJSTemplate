import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateAlbumDto {

  @ApiProperty({ description: '相册ID', example: '相册ID' })
  @IsNotEmpty({ message: '相册ID', context: { errorCode:  1 } })
  readonly id: string

  @ApiProperty({ title: '图景', example: '图景' })
  prospect: string

  @ApiProperty({ title: '备注', example: '备注' })
  remark: string
}