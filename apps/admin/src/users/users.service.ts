import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserModel} from "libs/db/models/user.model";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UserModel) private readonly model : ReturnModelType<typeof UserModel>,
  ) { }

  async findAllUser() {
    try {
      const result = await this.model.find({})

      return {
        code: 200,
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  async remove (id) {
    try {
      await this.model.findByIdAndRemove(id)
      return {
        code: 200,
        msg: '删除成功'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

}
