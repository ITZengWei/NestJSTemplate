import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserModel} from "libs/db/models/user.model";
import {BoosModel} from "libs/db/models/boos.model";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UserModel) private readonly model : ReturnModelType<typeof UserModel>,
    @InjectModel(BoosModel) private readonly boosModel : ReturnModelType<typeof BoosModel>,
  ) {}

  // 申请即成功
  async applyShop(dto, userInfo) {
    let { name } = dto
    await this.model.findByIdAndUpdate(userInfo._id, {
      type: 1,
      audit: 1
    })
    await this.boosModel.create({
      name, userId: userInfo._id
    })

    return {
      code: 200,
      msg: '认证商家成功'
    }
  }
}
