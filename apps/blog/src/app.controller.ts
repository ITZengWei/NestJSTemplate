import { AppService } from './app.service';
import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'


@ApiTags('文件操作')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 文件相关接口
  // @Post('/uploads')
  // @ApiOperation({ summary: '上传文件接口' })
  // @UseInterceptors(FileInterceptor('image'))
  // // @ApiBody({ description: 'List of cats', type: FileUploadDto })
  // async upload(@UploadedFile() file) {
  //   if (!file) return {
  //     code: -1,
  //     msg: '请上传图片'
  //   }
  //   console.log(file)
  //
  //   return file
  // }
}
