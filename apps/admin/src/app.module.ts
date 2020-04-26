import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommonModule} from "@app/common";
import { GoodsController } from './goods/goods.controller';
import { GoodsService } from './goods/goods.service';
import { SpecsController } from './specs/specs.controller';
import { SpecsService } from './specs/specs.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {AuthService} from "./auth/auth.service";
import { UsersService } from './users/users.service';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { MulterModule } from '@nestjs/platform-express'; // 文件操作

const MAO = require('multer-aliyun-oss')


@Module({
  imports: [
    CommonModule,
    AuthModule,
    MulterModule.registerAsync({
      useFactory() {
        const {
          OSS_REGION: region,
          OSS_ACCESS_KEY_ID: accessKeyId,
          OSS_ACCESS_KEY_SECRET: accessKeySecret,
          OSS_BUCKET : bucket
        } = process.env

        return {
          storage: MAO({
            config: {
              region,
              accessKeyId,
              accessKeySecret,
              bucket
            }
          })
        }
      }
    })
  ],
  controllers: [AppController, GoodsController, SpecsController, CategoriesController, UsersController, FilesController, /*AuthController*/],
  providers: [AppService, GoodsService, SpecsService, CategoriesService, UsersService, FilesService, /*AuthService*/],
})
export class AppModule {}
