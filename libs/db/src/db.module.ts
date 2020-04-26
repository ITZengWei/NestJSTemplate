import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import  { TypegooseModule } from 'nestjs-typegoose'
import {GoodsModel} from "libs/db/models/goods.model";
import {SpecModel} from "libs/db/models/spec.model";
import {CategoryModel} from "libs/db/models/category.model";
import {UserModel} from "libs/db/models/user.model";
import {BoosModel} from "libs/db/models/boos.model";


// 引用模型
const models = TypegooseModule.forFeature([
  GoodsModel,
  SpecModel,
  CategoryModel,
  UserModel,
  BoosModel
])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        // console.log(process.env, 'hello')
        return {
          // 地址
          uri: process.env.DB,
          // 参数
          useCreateIndex: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
      }
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
