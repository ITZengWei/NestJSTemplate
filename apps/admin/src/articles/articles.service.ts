import { Injectable } from '@nestjs/common';
import {ArticleModel} from "libs/db/models/article.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {transformEmptyObj} from "@app/common/Utils/tansform-empty.tool";
import {CategoryModel} from "libs/db/models/category.model";
import {TagModel} from "libs/db/models/tag.model";
import {ResponseResult} from "@app/common/Results/response.result";
import {ResultCode} from "@app/common/Results/code.result";

@Injectable()
export class ArticlesService {

  constructor(
    @InjectModel(ArticleModel) private readonly model: ReturnModelType<typeof ArticleModel>,
    @InjectModel(CategoryModel) private readonly categoryModel: ReturnModelType<typeof CategoryModel>,
    @InjectModel(TagModel) private readonly tagModel,
  ) {}

  private async hasCategory(categoryId) {
    const result = await this.categoryModel.findById(categoryId)
    console.log(typeof result, result, '分类')
    if (!result) return false
    return true
  }

  private randomColor() {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    return `rgba(${r},${g},${b},.8)`;
  }

  private async filterTags(tags) {
    try {
      const tagList = await this.tagModel.find({}, { 'name': '1', '_id': 1 }).lean()
      // console.log(tagList, '所有')
      const newTags = tags.filter(tag => {
        let target = tagList.find(v => {
          return String(v._id) === String(tag)
        })
        return !Boolean(target)
      })


      console.log(newTags, '新的')

      let result = await this.tagModel.insertMany(newTags.map(v => ({
        color: this.randomColor(),
        name: v,
        status: '1'
      })))

      // console.log(result, '插入成功')

      return tags.map(tag => {
        let target = result.find(v => {
          let { _id, name } = v
          return name === tag
        })
        return target ? target._id : tag
      })
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }



  async create(newArticle, userInfo) {
    let { title, author, traitImg, category, tags, contentHTML, contentMD, summary, completed } = newArticle

    tags = await this.filterTags(tags)

    // if(await !this.hasCategory(category)) { console.log('没有分类') }
    //
    // if (await !this.hasCategory(category)) return { code: -1, msg: '分类不存在，或者已经被删除了' }
    // console.log(category, await !this.hasCategory(category), '12112')
    // return
    console.log(tags, '标签id')

    let createData = transformEmptyObj({ title, author, traitImg, category, tags, contentHTML, contentMD, summary, completed })
    let result = await this.model.create({
      ...createData,
      userId: userInfo._id,
      status: '1'
    })
    return {
      code: 200,
      data: result,
      msg: '添加成功'
    }
  }


  async auth (payload) {

    try {
      let { id, status } = payload
      if (status === '0') return { code: -1, msg: '请同意或者拒绝' }
      await this.model.findByIdAndUpdate(id, { status })

      return {
        code: 200,
        data: { id, status },
        msg: status === '1' ? '审核通过' : '审核不通过'
      }

    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  async remove (id) {
    try {
      await this.model.findByIdAndRemove(id)
      return {
        code: 200,
        msg: '删除成功'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }


  async update (payload) {
    try {

      let { id, title, author, traitImg, category, tags, contentHTML, contentMD, summary, completed } = payload

      // if (category && !this.hasCategory(category)) return { code: -1, msg: '分类不存在，或者已经被删除了' }

      tags = await this.filterTags(tags)

      let editData = transformEmptyObj({ title, author, traitImg, category, tags, contentHTML, contentMD, summary, completed })
      await this.model.findByIdAndUpdate(id, editData)
      return {
        code: 200,
        msg: '修改成功'
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  async findByAdmin (payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize
      let vo = { _id: '1', title: '1', author: '1', traitImg: '1', category: '1', tags: '1', contentHTML: '1', contentMD: '1', summary: '1', status: '1', userId: '1', createdAt: '1', completed: '1' }
      let result = await this.model.find({}, vo)
        // .populate('tags')
        // .populate('userId')
        // .populate('category')
        .populate({
          path: 'tags',
          select: 'name',
        })
        .populate({
          path: 'category',
          select: 'name',
        })
        .populate({
          path: 'userId',
          select: 'account type tel'
        })
        .limit(pageSize)
        .skip(start)

      return {
        code: 200,
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  async findByUser (payload, userInfo) {
    try {
      let { pageNum, pageSize, completed, title } = payload
      console.log(completed)
      const start = (pageNum - 1) * pageSize
      let vo = { _id: '1', title: '1', author: '1', traitImg: '1', category: '1', tags: '1', contentHTML: '1', contentMD: '1', summary: '1', status: '1', createdAt: '1', completed: '1' }

      let filterParams = transformEmptyObj({
        userId: userInfo._id,
        completed,
        title: new RegExp(title)
      })
      let result = await this.model.find(filterParams, vo)
        .populate({
          path: 'tags',
          select: 'name',
        })
        .populate({
          path: 'category',
          select: 'name',
        })
        .limit(pageSize)
        .skip(start)
        .sort({ createdAt: -1 })


      const count = await this.model.find(filterParams).count()

      return new ResponseResult(ResultCode.success, {count, list: result})
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  async findArticle(id) {
    try {
      let vo = { _id: '1', title: '1', author: '1', traitImg: '1', category: '1', tags: '1', contentHTML: '1', contentMD: '1', summary: '1', status: '1', completed: '1' }
      let result = await this.model.findOne({ _id: id }, vo)
        .populate({
          path: 'tags',
          select: 'name',
        })
        .populate({
          path: 'category',
          select: 'name',
        })

      return {
        code: 200,
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }


}
