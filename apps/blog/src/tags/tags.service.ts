import { Injectable } from '@nestjs/common';
import {TagModel} from "libs/db/models/tag.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

@Injectable()
export class TagsService {

  constructor(
    @InjectModel(TagModel) private readonly model : ReturnModelType<typeof TagModel>
  ) { }

  async findAll(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      console.log(start, pageSize)
      let result = await this.model.find({ status: '1' }, { _id: '1', name: '1', color: '1' })
        .limit(pageSize)
        .skip(start)

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
