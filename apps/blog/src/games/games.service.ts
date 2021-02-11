import { Injectable } from '@nestjs/common';
import {GameModel} from "libs/db/models/game.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

@Injectable()
export class GamesService {

  constructor(
    @InjectModel(GameModel) private readonly model: ReturnModelType<typeof GameModel>
  ) {}


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
