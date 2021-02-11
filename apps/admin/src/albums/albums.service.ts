import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {AlbumModel} from "libs/db/models/album.model";
import {transformEmptyObj} from "@app/common/Utils/tansform-empty.tool";
import {ResponseResult} from "@app/common/Results/response.result";
import {ResultCode} from "@app/common/Results/code.result";

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(AlbumModel) private readonly model: ReturnModelType<typeof AlbumModel>
  ) {}


  async create(newAlbum) {
    console.log(newAlbum)
    let { prospect, remark } = newAlbum
    let result = await this.model.create({
      prospect, remark
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
      let { prospect, remark, id } = payload
      let editData = transformEmptyObj({ prospect, remark })
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


  async findAll(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      let result = await this.model.find({}, { _id: '1', prospect: '1', remark: '1', createdAt: '1' })
      .limit(pageSize)
      .skip(start)
      .sort({ createdAt: -1 })

      const count = await this.model.find().count()

      return new ResponseResult(ResultCode.success, {count, list: result})

    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

}
