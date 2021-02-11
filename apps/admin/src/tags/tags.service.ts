import { Injectable } from '@nestjs/common';
import {TagModel} from "libs/db/models/tag.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {transformEmptyObj} from "@app/common/Utils/tansform-empty.tool";
import {CreateTagDto} from "./dtos/create-tag.dto";

@Injectable()
export class TagsService {

  constructor(
    @InjectModel(TagModel) private readonly model : ReturnModelType<typeof TagModel>
  ) { }

  async create(payload: CreateTagDto) {

    try {
      let { name, color } = payload
      let result = await this.model.create({
        name, color, status: '1' // todo
      })
      return {
        code: 200,
        data: result,
        msg: '添加成功(等待管理员的审核)'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }
  async auth (payload) {
    try {
      let { id, status } = payload
      if (status === '0') return { code: -1, msg: '请同意或者拒绝' }
      await this.model.findByIdAndUpdate(id, { status })

      return {
        code: 200,
        data: { id, status },
        msg: status === '1' ? '审核通过' : '审核不通过'
      }

    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
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
      let { name, color, id } = payload
      let editData = transformEmptyObj({ name, color })
      console.log(editData, 'editData')
      await this.model.findByIdAndUpdate(id, editData)
      return {
        code: 200,
        msg: '修改成功'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  /* 用户获取标签 */
  async findAll(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      let result = await this.model.find({ status: '1' }, {_id: '1', name: '1', color: '1' })
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

  /* 管理员获取标签 */
  async findAllByAdmin(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      let result = await this.model.find({}, {_id: '1', name: '1', color: '1', status: '1' })
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
