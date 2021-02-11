import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {

  async upload(file) {
    console.log(file)
    let { filename, url } = file

    if (true) {
      const PORT = process.env.BLOG_PORT || 3065

      // 是否为测试
      url = `http://api_b_f.smalllb.top/uploads/${ file.filename }`
    }

    return {
      data: { filename, url },
      code: 200
    }
  }
}
