import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class FindGoodsDto {

  @ApiProperty({ description: '当前页', example: 1 })
  @IsNotEmpty({ message: '当前页不能为空', context: { errorCode:  1 } })
  @Type((val) => Number)
  readonly pageNum: number

  @ApiProperty({ description: '分页数量', example: 3 })
  @Type((val) => Number)
  @IsNotEmpty({ message: '分页数量不能为空', context: { errorCode:  1 } })
  readonly pageSize: number

  @ApiProperty({ description: '所属分类', example: '5e9130feeb4d2238f00f838c' })
  readonly category: string

}