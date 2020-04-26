import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {GoodsModel} from "libs/db/models/goods.model";
import {CategoryModel} from "libs/db/models/category.model";
import {SpecModel} from "libs/db/models/spec.model";


// 商家TOKEN eyJhbGciOiJIUzI1NiJ9.NWU5MjgzZjMxMDVkZGY1MDc4MjBlOWYz.6umT6LR1iyPdUO5LwIf9tq_uBl3FZ7IJMdx7d6kRsLM



@Injectable()
export class GoodsService {

  constructor(
    @InjectModel(GoodsModel) private readonly model : ReturnModelType<typeof GoodsModel>,
    @InjectModel(CategoryModel) private readonly categoryModel : ReturnModelType<typeof CategoryModel>,
  ) {}


  // 获取商品列表
  async findAll(findGoodsDto, userInfo) {
    let { pageNum, pageSize, category } = findGoodsDto
    let { type, _id } = userInfo // type = 1 商家 type = 2 管理员
    let filterParams = {}
    if (category) {
      filterParams['category'] = category
    }

    if (type === '1') {
      filterParams['userId'] = String(_id)
    } else if (type === '2') {

    }
    console.log(filterParams)

    const start = (pageNum - 1) * pageSize

    const list = await this.model.find(filterParams)
      .populate('category')
      .populate('skuArray')
      .limit(pageSize)
      .skip(start)
    const total = await this.model.find().count()

    return {
      code: 200,
      data: list,
      pages: {
        total,
        pageSize,
        pageNum
      }
    }

  }

  async findOne(id) {
    try {
      const result = await this.model.findById(id).populate('userId')
      return { code: 200, data: result }
    } catch (e) {
      return {
        msg: '没有该商品',
        code: -1
      }
    }
  }

  async create(dto) {
    console.log(dto)
    try {
      const categoryObj = await this.categoryModel.findById(dto.category)
      // console.log(categoryObj)
      // dto.category = categoryObj
      dto.audit = '0' // 审核状态

      console.log(await this.model.create(dto))
      return { msg: '添加商品成功', code: 200 }
    } catch (e) {
      console.log(e)
      return { msg: '分类ID无效', code: -1 }
    }
    return {}
    //
  }


  // 商品审核
  async shopAudit(dto) {
    let { id, audit } = dto
    try {
      // 审核 之后 如果不 通过 是不是 重新 添加 还是
      const result = await this.model.findById(id)
      if (result.audit === '1') {
        return { code: -1, msg: '已经通过审核' }
      }

      await this.model.findByIdAndUpdate(id, { audit: audit })

      return {
        code: 200,
        msg: `审核完成`
      }
    } catch (e) {
      return {
        code: -1,
        msg: '商品ID错误'
      }
    }
  }

  // 上架
  async onShelves(dto) {
    console.log(dto)
    let { id, action } = dto
    try {
      const result = await this.model.findById(id)
      let { audit, status } = result
      if (audit !== '1') {
        console.log('审核状态', audit, typeof  audit)
        return { code: -1, msg: '请先通过审核' }
      }

      if (status == action) return { code: -1, msg: 'action 异常' }

      await this.model.findByIdAndUpdate(id, { status: action })

      return {
        code: 200,
        msg: `${ (action == '1') ? '上' : '下' }架成功`
      }
    } catch (e) {
      return {
        code: -1,
        msg: '商品ID错误'
      }
    }
  }
}
