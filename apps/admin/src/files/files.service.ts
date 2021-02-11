import { Injectable } from '@nestjs/common';
import {ResponseResult} from "@app/common/Results/response.result";
import {ResultCode} from "@app/common/Results/code.result";

@Injectable()
export class FilesService {
  async upload(file) {
    if (!file) {
      return new ResponseResult(ResultCode.other, null, '请上传图片')
    }

    let { filename, url, path } = file

    if (false) {
      url = `http://api_b_f.smalllb.top/uploads/${ file.filename }`
    } else {
      url = `http://localhost:3077/uploads/${ file.filename }`
    }


    return new  ResponseResult(ResultCode.success, {
      filename, url
    })
  }

}
