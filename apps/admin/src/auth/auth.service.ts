import { Injectable } from '@nestjs/common';
import {UserModel} from "libs/db/models/user.model";
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {BoosModel} from "libs/db/models/boos.model";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>,
    @InjectModel(BoosModel) private readonly boosModel: ReturnModelType<typeof BoosModel>,
    private JwtService: JwtService,
  ) {}

  async login(user) {
    // 拿到 用户 id 生成 token
    const token = this.JwtService.sign(String(user._id))
    return {
      msg: '登录成功',
      token: token,
      code: 200
    }
  }

  async register(newUser) {
    let { account, tel, psw, code } = newUser

    try {
      // 判断验证码是否为 注册操作
      if (code != '200') return { msg: 'code 必须为 200', code: -1 }
      // 判断有没有 这个用户
      const user = await this.userModel.findOne({
        $or: [
          {account: account}, {tel:tel}
        ]
      })
      if (user) {
        return {
          msg: '用户名或者手机号重复',
          code: -1
        }
      }
      const result = await this.userModel.create({
        account, tel, psw,
        type: '0',
        nickname: account,
        sex: '-1'
      })
      console.log(result)


      return {
        msg: '注册成功',
        code: 200
      }

    } catch (e) {
      return {
        code: -1,
        msg: e.message
      }
    }
  }

  async userInfo(userInfo) {
    let { type, audit, _id } = userInfo
    // 已经成为 BOOS
    if (type === '1' && audit === '1') {
      const boosInfo = await this.boosModel.findOne({ userId: _id }).lean()
      userInfo.boosInfo = boosInfo
    }

    return {
      userInfo: userInfo,
      msg: '获取用户信息成功',
      code: 200
    }
  }

}
