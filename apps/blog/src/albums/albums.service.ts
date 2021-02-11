import { Injectable } from '@nestjs/common';
import {AlbumModel} from "libs/db/models/album.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'


@Injectable()
export class AlbumsService {

  constructor(
    @InjectModel(AlbumModel) private readonly model: ReturnModelType<typeof AlbumModel>
  ) { }

  async findAll(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      console.log(start, pageSize)
      let result = await this.model.find({}, { _id: '1', prospect: '1', remark: '1', createdAt: '1' })
        .limit(pageSize)
        .skip(start)
        .sort({ createdAt: -1 })

      return {
        code: 200,
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

}
