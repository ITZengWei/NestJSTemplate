import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {SplitPageDto} from "@app/common/dtos/split-page.dto";
import {CategoriesService} from "./categories.service";



@ApiTags('分类相关接口')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly CategoriesService: CategoriesService
  ) { }

  @Post()
  async findAll(@Body() splitPageDto: SplitPageDto) {
    return await this.CategoriesService.findAll(splitPageDto)
  }
}
