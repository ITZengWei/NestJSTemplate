import { createParamDecorator, BadRequestException } from '@nestjs/common';
import {ApiException} from "@app/common/Exceptions/ApiException";

export const CurrentUser = createParamDecorator((data, res) => {
  let { type } = res.user
  console.log(type, '用户类型')
  if (data === 'admin' && type !== '2') {
    throw new BadRequestException('用户类型不符合管理员')
  } else if (data === 'boos' && type !== '1') {
    throw new BadRequestException('用户类型不符合商家')
  } else if (data === 'auth' && type === '0') {
    throw new BadRequestException('普通用户暂无权限')
  }
  return res.user
})


export const AdminUser = createParamDecorator((data, res) => {
  throw new BadRequestException('用户类型错误');
  return res.user
})

export const BoosUser = createParamDecorator((data, res) => {
  throw new BadRequestException('用户类型错误');
  return res.user
})

