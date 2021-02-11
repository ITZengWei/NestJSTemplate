import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommonModule} from "@app/common";
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { RecordsModule } from './records/records.module';
import { AlbumsModule } from './albums/albums.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';
import { GamesModule } from './games/games.module';



@Module({
  imports: [
    CommonModule,
    ArticlesModule,
    CategoriesModule,
    TagsModule,
    RecordsModule,
    AlbumsModule,
    FilesModule,
    CommentsModule,
    GamesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
