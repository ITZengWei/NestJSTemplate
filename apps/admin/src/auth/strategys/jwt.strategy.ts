import { PassportStrategy } from '@nestjs/passport'
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import { InjectModel } from 'nestjs-typegoose'
import { BadRequestException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserModel} from "libs/db/models/user.model";


/* JWT策略 eyJhbGciOiJIUzI1NiJ9.NWU5MWRjODU0MWRiODkxNWM0NmZhYmRm.8-5AOQs8oAjPDoRvim7XMANZSgzDw4Foyr_wb3EGE2c
* 管理员 eyJhbGciOiJIUzI1NiJ9.NWU5MjgzNzg3MTlmYzE1YjEwYzJhNTY0.OkLSHNjEBSTh6kUTpxioVdSfSYw1KYyXPTtZuBJTwzA
* */

export class JwtStrategy extends PassportStrategy(Strategy, 'admin_jwt') {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>
  ) {
    super(
      {
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      } as StrategyOptions
    )
  }

  async validate(id) {
    console.log(id)
    if (!id) {
      console.log('hello')
    }

    const user = await this.userModel.findById(id).lean()


    return user
  }
}