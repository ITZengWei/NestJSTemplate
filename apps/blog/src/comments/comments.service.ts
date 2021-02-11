import { Injectable } from '@nestjs/common';
import {CommentModel} from "libs/db/models/comment.model";
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import {UserModel} from "libs/db/models/user.model";

@Injectable()
export class CommentsService {
  private  blogSelf
  constructor(
    @InjectModel(CommentModel) private readonly model: ReturnModelType<typeof CommentModel>,
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>
  ) {
    // 博客自己的账号
    const blogSelfNames = ['bill', 'tom']
    this.findUser(blogSelfNames)
  }

  async findUser(names) {
    try {
      const result = await this.userModel.find({ 'account': { "$in": names } }, { '_id': '1' })
      this.blogSelf = result.map(v => v._id)
    } catch (e) {

    }
  }



  async findAllByBlog(payload) {
    try {
      let { pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize

      let filterParams = {
        // userId: { '$in': this.blogSelf },
        commentType: '1',
        status: '1',
      }
      let vo = { content: '1', from: '1', top: '1', createdAt: '1' }

      let result = await this.model.find(filterParams, vo)
        .populate({
          path: 'userId',
          select: 'account nickname sex'
        })
        .limit(pageSize)
        .skip(start)

      return {
        code: 200,
        data: result
      }
    } catch (err) {
      return { code: -1, msg: err.message, /*err: err*/ }
    }
  }

  async sendByBlog(payload) {
    try {
      let { content, from, userId, top } = payload

      /* TODO  userId, 需要登录 */
      const result = await this.model.create({
        content, from, top, commentType: '1', status: '1'
      })

      return {
        code: 200,
        msg: '发表成功~',
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: err.message, /*err: err*/ }
    }
  }

  async findAllByArticle(payload) {
    try {
      let { articleId, pageNum, pageSize } = payload
      const start = (pageNum - 1) * pageSize

      let filterParams = {
        commentType: '2',
        status: '1',
        article: articleId
      }
      let vo = { content: '1', from: '1', top: '1', createdAt: '1' }

      let result = await this.model.find(filterParams, vo)
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

  async sendByArticle(payload) {
    try {
      let { content, from, userId, top, article } = payload
      /* TODO  userId, 需要登录 */
      const result = await this.model.create({
        article, content, from, top, commentType: '2', status: '1'
      })

      return {
        code: 200,
        msg: '发表成功~',
        data: result
      }
    } catch (err) {
      console.log(err)
      return { code: -1, msg: '错误', err: err }
    }
  }

  async remove(id) {
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

}
