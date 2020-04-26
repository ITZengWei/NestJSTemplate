import { PassportStrategy } from '@nestjs/passport'
import { Strategy, IStrategyOptions } from 'passport-local'
import { InjectModel } from 'nestjs-typegoose'
import { BadRequestException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { compareSync } from 'bcryptjs'
import {UserModel} from "libs/db/models/user.model";


/* 本地策略  */
export class LocalStrategy extends PassportStrategy(Strategy, 'admin_local') {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>
  ) {
    super(
      {
        usernameField: 'account',
        passwordField: 'psw'
      } as IStrategyOptions
    )
  }

  async validate(account, psw) {
    const user = await this.userModel.findOne({
      $or: [
        {account: account}, {tel:account}
      ]
    }).select('+psw')
    if (!user) {
      throw new BadRequestException('用户名不存在')
    }
    if (!compareSync(psw, user.psw)) {
      throw new BadRequestException('用户名密码错误')
    }

    return user
  }
}