import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {


  async upload(file) {
    console.log(file)
    let { filename, url } = file
    return file
  }

}
