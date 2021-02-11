import { Injectable } from '@nestjs/common';
import {ArticleModel} from "libs/db/models/article.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserModel} from "libs/db/models/user.model";

@Injectable()
export class ArticlesService {
  private  blogSelf

  constructor(
    @InjectModel(ArticleModel) private readonly model : ReturnModelType<typeof ArticleModel>,
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>
  ) {
    // this.init()
    // 博客自己的账号
    const blogSelfNames = ['bill', 'tom', 'Bill']
    this.findUser(blogSelfNames)
  }

  async findUser(names) {
    try {
      const result = await this.userModel.find({ 'account': { "$in": names } }, { '_id': '1' })
      this.blogSelf = result.map(v => v._id)
    } catch (e) {

    }
  }

  async findAll(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize

      let filterParams = { userId: { '$in': this.blogSelf }, status: '1', completed: true }

      let vo = { title: '1', author: '1', traitImg: '1', readCount: '1',  summary: '1', createdAt: '1', updatedAt: '1' }

      let result = await this.model.find(filterParams, vo)
        .populate({
          path: 'category',
          select: 'name _id'
        })
        .populate({
          path: 'tags',
          select: 'name _id'
        })
        .limit(pageSize)
        .skip(start)
        .sort({ createdAt: -1 })

      return {
        code: 200,
        data: result
      }

    } catch (err) {
      console.log(err)
      return { code: -1, msg: err.message, /*err: err*/ }
    }
  }

  async findAllByTag(payload) {
    try {
      let { pageNum, pageSize, tagId, tagName } = payload
      const start = (pageNum - 1) * pageSize

      let filterParams = {
        userId: { '$in': this.blogSelf },
        tags: { '$all': [tagId] },
        status: '1',
        completed: true
      }
      let vo = { title: '1', author: '1', traitImg: '1', readCount: '1',  summary: '1', createdAt: '1', updatedAt: '1' }

      let result = await this.model.find(filterParams, vo)
        .populate({
          path: 'category',
          select: 'name _id'
        })
        .populate({
          path: 'tags',
          // match: { name: tagName },
          select: 'name _id'
        })
        .limit(pageSize)
        .skip(start)
        .sort({ createdAt: -1 })

      return {
        code: 200,
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: err.message, /*err: err*/ }
    }
  }

  async findAllByCategory(payload) {
    try {
      let { pageNum, pageSize, categoryId } = payload
      const start = (pageNum - 1) * pageSize

      let filterParams = { userId: { '$in': this.blogSelf }, status: '1', category: categoryId, completed: true }
      let vo = { title: '1', author: '1', traitImg: '1', readCount: '1',  summary: '1', createdAt: '1', updatedAt: '1' }

      let result = await this.model.find(filterParams, vo)
        .populate({
          path: 'category',
          select: 'name _id'
        })
        .populate({
          path: 'tags',
          select: 'name _id'
        })
        .limit(pageSize)
        .skip(start)
        .sort({ createdAt: -1 })

      return {
        code: 200,
        data: result
      }

    } catch (err) {
      console.log(err)
      return { code: -1, msg: err.message, /*err: err*/ }
    }
  }

  async findById(id) {
    try {
      let vo = { title: '1', author: '1', traitImg: '1', readCount: '1',  summary: '1', createdAt: '1', updatedAt: '1', contentHTML: '1', contentMD: '1' }

      let result = await this.model.findById(id, vo)
        .populate({
          path: 'category',
          select: 'name _id'
        })
        .populate({
          path: 'tags',
          select: 'name _id'
        }).lean()

      return {
        code: 200,
        data: result
      }

    } catch (err) {
      console.log(err)
      return { code: -1, msg: err.message, /*err: err*/ }
    }
  }

  async addReadCount(id) {



    try {
      // await this.model.findByIdAndUpdate(id, {}, (err, res) => {
      //   if (err) throw err
      //   console.log(res)
      //   console.log(res.readCount ? 1 : 0)
      //   return {
      //     ...res,
      //     readCount: 100
      //   }
      // })

     const result = await this.model.findById(id)

     const newCount = result.readCount ? ++result.readCount : 1

      await this.model.findByIdAndUpdate(id, { readCount: newCount })

      return { code: 200, msg: '增加成功' }

    } catch (error) {
      return {
        error: error,
        msg: '错误',
        code: -1
      }
    }
  }

}
