import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import  { TypegooseModule } from 'nestjs-typegoose'

import {CategoryModel} from "libs/db/models/category.model"

import {UserModel} from "libs/db/models/user.model";

import {RecordModel} from "libs/db/models/record.model";
import {ImageModel} from "libs/db/models/image.model";
import {CommentModel} from "libs/db/models/comment.model";
import {TagModel} from "libs/db/models/tag.model";
import {AlbumModel} from "libs/db/models/album.model";
import {ArticleModel} from "libs/db/models/article.model";
import {GameModel} from "libs/db/models/game.model";
import { MenuModel } from "libs/db/models/menu.model";



// 引用模型
const models = TypegooseModule.forFeature([
  CategoryModel,
  UserModel,
  RecordModel,
  ImageModel,
  CommentModel,
  TagModel,
  AlbumModel,
  ArticleModel,
  GameModel,
  MenuModel
])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        let { DB: DBHost = 'mongodb://localhost:27017/nest-blog-project' } = process.env
        return {
          // 地址
          uri: DBHost,
          // 参数
          useCreateIndex: true,
          useFindAndModify: false,
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
