import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {transformEmptyObj} from "@app/common/Utils/tansform-empty.tool";
import {GameModel} from "libs/db/models/game.model";

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(GameModel) private readonly model: ReturnModelType<typeof GameModel>
  ) {}


  async create(payload) {
    let { cover, remark, origin, link } = payload
    let result = await this.model.create({
      cover, remark, origin, link
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
      let { cover, remark, origin, link, id } = payload
      let editData = transformEmptyObj({ cover, remark, origin, link })
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


  async findAll() {
    try {

      const vo = { _id: '1', cover: '1', remark: '1', origin: '1', link: '1', createdAt: '1' }
      let result = await this.model.find({}, vo)
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
