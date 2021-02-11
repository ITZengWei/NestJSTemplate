import { Controller, Post, Delete, Get, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Crud } from 'nestjs-mongoose-crud'
import {IUserType, MenuModel} from "libs/db/models/menu.model";
import {MenusService} from './menus.service'
import {CreateMenuDto} from "./dtos/create-menu.dto";
import {UpdateMenuDto} from "./dtos/update-menu.dto";
import {SplitPageDto} from "@app/common/dtos/split-page.dto";
import {FindAsideMenuDto} from "./dtos/find-aside-menu.dto";

@Crud({
  model: MenuModel,
})
@ApiTags('菜单相关接口')
@Controller('menus')
export class MenusController {
  constructor(
    private readonly MenusService: MenusService,
    @InjectModel(MenuModel) private readonly model : ReturnModelType<typeof MenuModel>,
  ) {

  }

  @Post('useCreate')
  @ApiOperation({ summary: '添加菜单' })
  async useCreate(@Body() createMenuDto: CreateMenuDto): Promise<any> {
    return await this.MenusService.useCreate(createMenuDto)
  }

  @Delete('useRemove')
  @ApiOperation({ summary: '删除菜单' })
  async useRemove(@Body() ids: string []): Promise<any> {
    return await this.MenusService.useRemove(ids)
  }

  @Put('useUpdate')
  @ApiOperation({ summary: '修改菜单' })
  async useUpdate(@Body() dto: UpdateMenuDto): Promise<any> {
    return await this.MenusService.useUpdate(dto)
  }



  @Post('useFind')
  @ApiOperation({ summary: '获取菜单数据' })
  async findMenus(@Body() dto: SplitPageDto): Promise<any> {
    return await this.MenusService.findMenus(dto)
  }

  @Post('aside')
  @ApiOperation({ summary: '获取侧边栏菜单' })
  async findAsideMenus(@Body() dto: FindAsideMenuDto): Promise<any> {
    console.log(dto)
    return await this.MenusService.findAsideMenus(dto.userType)
  }

  @Get('tree')
  @ApiOperation({ summary: '获取菜单树' })
  async findMenuTree(): Promise<any> {
    return await this.MenusService.findMenuTree()
  }

  @Get('reset')
  @ApiOperation({ summary: '重置数据' })
  async reset() {
    await this.model.deleteMany({})

    return {
      msg: '重置成功'
    }
  }
}
