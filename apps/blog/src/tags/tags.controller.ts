import { Controller, Get, Body, Post } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {TagModel} from "libs/db/models/tag.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {TagsService} from "./tags.service";
import {SplitPageDto} from "@app/common/dtos/split-page.dto";



@ApiTags('标签相关接口')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly TagsService: TagsService,
    @InjectModel(TagModel) private readonly model : ReturnModelType<typeof TagModel>
  ) { }

  @Post()
  async findAll(@Body() splitPageDto: SplitPageDto) {
    return await this.TagsService.findAll(splitPageDto)
  }
}
