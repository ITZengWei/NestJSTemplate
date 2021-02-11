import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {SplitPageDto} from "@app/common/dtos/split-page.dto";

export class FindArticleTagDto extends SplitPageDto {

  @ApiProperty({ title: '标签Id', example: '标签Id' })
  @IsNotEmpty({ message: '标签Id不能为空', context: { errorCode: -1 } })
  tagId: string

  // @ApiProperty({ title: '标签名', example: '标签名' })
  // @IsNotEmpty({ message: '标签名不能为空', context: { errorCode: -1 } })
  // tagName: string
}