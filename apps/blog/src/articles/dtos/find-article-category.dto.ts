import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {SplitPageDto} from "@app/common/dtos/split-page.dto";

export class FindArticleCategoryDto extends SplitPageDto {

  @ApiProperty({ title: '分类Id', example: '分类Id' })
  @IsNotEmpty({ message: '分类Id不能为空', context: { errorCode: -1 } })
  categoryId: string
}