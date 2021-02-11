import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import {CommonModule} from "@app/common"; // 文件操作

const MAO = require('multer-aliyun-oss')

@Module({
  imports: [
    CommonModule,
    // MulterModule.register({
    //   dest: '/uploads',
    // }),
    MulterModule.registerAsync({
      useFactory() {
        console.log(process.env)
        const {
          OSS_REGION: region = 'oss-cn-hangzhou',
          OSS_ACCESS_KEY_ID: accessKeyId = 'LTAI4FqEx3LQANf6jnAHKTSN',
          OSS_ACCESS_KEY_SECRET: accessKeySecret = 'jEKudwA8TLBnPsdGbGVR23922FCrtb',
          OSS_BUCKET: bucket = 'smalllb'
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
