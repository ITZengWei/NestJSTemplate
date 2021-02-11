import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {GamesService} from "./games.service";

@ApiTags('游戏相关接口')
@Controller('games')
export class GamesController {
  constructor(
    private readonly GamesService: GamesService
  ) { }

  @Get()
  @ApiOperation({ summary: '获取游戏' })
  async findAll(): Promise<any> {
    return await this.GamesService.findAll()
  }
}
