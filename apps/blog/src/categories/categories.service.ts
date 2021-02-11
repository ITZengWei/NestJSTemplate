import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {CategoryModel} from "libs/db/models/category.model";

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(CategoryModel) private readonly model: ReturnModelType<typeof CategoryModel>
  ) { }

  async findAll(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      console.log(start, pageSize)
      let result = await this.model.find({}, { _id: '1', name: '1', parentCategory: '1', grandparentCategory: '1' })
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
