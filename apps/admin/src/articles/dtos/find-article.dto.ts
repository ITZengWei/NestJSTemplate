import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {SplitPageDto} from "@app/common/dtos/split-page.dto";

export class FindArticleDto extends SplitPageDto{

  // @IsBoolean({ message: '只能为Boolean', context: { errorCode: -1 } })
  @ApiProperty({ title: '完成状态', example: '完成状态(true)' })
  @Type((val) => Boolean)
  completed: boolean

  @ApiProperty({ title: '文章标题', example: 'title' })
  title: string
}