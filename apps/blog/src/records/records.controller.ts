import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {RecordModel} from "libs/db/models/record.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {SplitPageDto} from "@app/common/dtos/split-page.dto";
import {RecordsService} from "./records.service";


@ApiTags('记录相关接口')
@Controller('records')
export class RecordsController {
  constructor(
    @InjectModel(RecordModel) private readonly model : ReturnModelType<typeof RecordModel>,
    private RecordService: RecordsService
  ) {
    // this.model.insertMany( [])
  }


  @Post('')
  @ApiOperation({ summary: '获取记录' })
  async findAll(@Body() splitPageDto: SplitPageDto): Promise<any> {
    return await this.RecordService.findAll(splitPageDto)
  }
}
