import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommonModule} from "@app/common";
import { MulterModule } from '@nestjs/platform-express'; // 文件操作
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import {AuthModule} from "./auth/auth.module";
import { RecordsModule } from './records/records.module';
import { AlbumsModule } from './albums/albums.module';
import { ArticlesModule } from './articles/articles.module';
import { GamesModule } from './games/games.module';
import { TagsModule } from './tags/tags.module';
import { MenusModule } from './menus/menus.module';


@Module({
  imports: [
    CommonModule,
    UsersModule,
    FilesModule,
    CategoriesModule,
    AuthModule,
    RecordsModule,
    AlbumsModule,
    ArticlesModule,
    GamesModule,
    TagsModule,
    MenusModule,
  ],
  controllers: [

  ],
  providers: [AppService],
})
export class AppModule {}
