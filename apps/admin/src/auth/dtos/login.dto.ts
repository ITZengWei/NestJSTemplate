import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator'


export const LoginDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class LoginDto {

  @ApiProperty({ title: '用户名/手机号', example: 'Bill' })
  @IsNotEmpty({ message: '用户名/手机号不能为空', context: { errorCode: -1 } })
  account: string

  @IsNotEmpty({ message: '密码不能为空', context: { errorCode: -1 } })
  @ApiProperty({ title: '密码', example: '110349' })
  psw: string

}