import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import {FilesService} from "./files.service";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import {FileUploadDto} from "./dtos/file-upload.dto";

@ApiTags('文件操作')
@Controller('')
export class FilesController {
  constructor(
    private readonly FilesService: FilesService
  ) { }

  // 文件相关接口
  @Post('/upload')
  @ApiOperation({ summary: '上传文件接口' })
  @UseInterceptors(FileInterceptor('image'))
  // @ApiBody({ description: 'List of cats', type: FileUploadDto })
  async upload(@UploadedFile() file): Promise<any> {
    if (!file) return {
      code: -1,
      msg: '请上传图片'
    }
    console.log(file)

    return this.FilesService.upload(file)
  }
}
