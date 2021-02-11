import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'
import {BaseValidationPipe} from "@app/common/pipes/base-validate.pipe";

async function bootstrap() {
  const app = await NestFactory.create< NestExpressApplication >(AppModule);
  // 处理跨域
  app.enableCors()

  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })
  // 博客前台
  // app.useStaticAssets('blog_front', {
  //   prefix: '/'
  // })

  // 指定全局管道
  app.useGlobalPipes(new BaseValidationPipe());


  // swagger 文档
  const options = new DocumentBuilder()
    .setTitle('个人博客前台接口')
    .setDescription('The Nest Project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  console.log('blog')
  // 引入依赖端口

  // console.log(process.env, process.env.BLOG_PORT)

  const PORT = process.env.BLOG_PORT || 3065
  await app.listen(PORT)
  console.log(`server is running port at ${ PORT }`)
}
bootstrap();
