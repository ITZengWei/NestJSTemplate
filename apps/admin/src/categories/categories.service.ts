import { Injectable } from '@nestjs/common';
import {CategoryModel} from "libs/db/models/category.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'


@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategoryModel) private readonly model: ReturnModelType<typeof CategoryModel>
  ) {}

  async findAll(findCategoryDto) {
    console.log(findCategoryDto)
    let { pageNum, PageSize } = findCategoryDto
    // TODO 怎么查找递归的
    let originData = await this.model.find({}, {_id: '1', name: '1'})
    // console.log(originData)
    let data = originData.map(v => {
      let {  } = v
      return v
    })
    return {
      code: 200,
      data: data
    }
  }

  async create(newCategory) {
    console.log(newCategory)
    let result = await this.model.create(newCategory)
    return {
      code: 200,
      data: result,
      msg: '添加成功'
    }
  }


  async edit(editCategory) {
    // console.log(editCategory)
    let { id, ...data } = editCategory
    try {

      await this.model.findByIdAndUpdate(id, data)
      return {
        code: 200,
        msg: '修改成功',
        data: data
      }

    } catch (e) {
      return {
        code: -1,
        msg: '分类ID 错误'
      }
    }
  }

  async remove(id) {
    try {
      await this.model.findByIdAndDelete(id)
      return { code: 200, msg: '删除成功' }
    } catch (e) {
      return { code: -1, msg: '分类ID 错误' }
    }
  }
}
