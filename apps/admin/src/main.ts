import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'
import {BaseValidationPipe} from "@app/common/pipes/base-validate.pipe";


async function bootstrap() {
  const app = await NestFactory.create< NestExpressApplication >(AppModule);
  // 处理跨域
  app.enableCors()

  // 指定全局管道
  app.useGlobalPipes(new BaseValidationPipe());

  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })

  // swagger 文档
  const options = new DocumentBuilder()
    .setTitle('博客后台接口')
    .setDescription('The Nest Project ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  console.log('admin')
  // 引入依赖端口
  const PORT = process.env.ADMIN_PORT || 3077
  await app.listen(PORT)
  console.log(`server is running port at ${ PORT }`)
}
bootstrap();
