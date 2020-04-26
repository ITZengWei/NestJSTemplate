import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'
import {UpdateCategoryDto} from "./dtos/update-category.dto";
import {CreateCategoryDto} from "./dtos/create-category.dto";
import {FindCategoryDto} from "./dtos/find-category.dto";
import {UserDocumentType} from "libs/db/models/user.model";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";



@ApiTags('分类相关接口')
@Controller('categories')
export class CategoriesController {
  constructor(
    // @InjectModel(CategoryModel) private readonly model : ReturnModelType<typeof CategoryModel>
    private readonly CategoriesService: CategoriesService
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '获取分类' })
  async findAll(@Body() findCategoryDto: FindCategoryDto): Promise<any> {
    return await this.CategoriesService.findAll(findCategoryDto);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '添加分类' })
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    console.log(createCategoryDto, '传过来的数据')
    return await this.CategoriesService.create(createCategoryDto)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '修改分类' })
  async edit(@Body() updateCategoryDto: UpdateCategoryDto, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.CategoriesService.edit(updateCategoryDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '删除分类' })
  async remove(@Param('id') id: string, @CurrentUser('admin') userInfo: UserDocumentType): Promise<any> {
    return await this.CategoriesService.remove(id)
  }
}


































// import { Controller } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger'
// import { Crud } from 'nestjs-mongoose-crud'
// import {CategoryModel} from "libs/db/models/category.model";
// import { InjectModel } from 'nestjs-typegoose'
// import { ReturnModelType } from '@typegoose/typegoose'
//
// @Crud({
//   model: CategoryModel
// })
// @ApiTags('分类相关接口')
// @Controller('categories')
// export class CategoriesController {
//   constructor(
//     @InjectModel(CategoryModel) private readonly model : ReturnModelType<typeof CategoryModel>
//
//   ) {}
// }
