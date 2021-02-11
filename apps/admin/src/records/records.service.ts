import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {RecordModel} from "libs/db/models/record.model";
import { Injectable } from '@nestjs/common';
import {ResponseResult} from "@app/common/Results/response.result";
import {ResultCode} from "@app/common/Results/code.result";


@Injectable()
export class RecordsService {

  constructor(
    @InjectModel(RecordModel) private readonly model: ReturnModelType<typeof RecordModel>
  ) {}


  async create(newRecord, userInfo) {
    let { content } = newRecord
    let result = await this.model.create({
      content, userId: userInfo._id
    })
    return {
      code: 200,
      data: result,
      msg: '添加成功'
    }
  }


  async remove (id) {
    try {
      let result = await this.model.findByIdAndRemove(id)
      return {
        code: 200,
        data: result,
        msg: '删除成功'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }


  async update (payload) {
    try {
      let { content, id } = payload
      await this.model.findByIdAndUpdate(id, { content })
      return {
        code: 200,
        msg: '修改成功'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }


  async findAll() {

    try {
      // let { pageNum, pageSize } = payload
      // const start = (pageNum - 1) * pageSize
      let result = await this.model.find({}, { _id: '1', content: '1', createdAt: '1' })
        .sort({ createdAt: -1 })
        // .limit(pageSize)
        // .skip(start)

      return new ResponseResult(ResultCode.success, result)


    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

}
