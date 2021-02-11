import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmpty } from 'class-validator'


export const CreateArticleDescription = `
  account: 用户名 或 手机号
  
  psw: 密码
`

export class CreateAlbumDto {

  @ApiProperty({ title: '图景', example: '图景' })
  @IsNotEmpty({ message: '图景不能为空', context: { errorCode: -1 } })
  prospect: string

  @ApiProperty({ title: '备注', example: '备注' })
  @IsNotEmpty({ message: '备注不能为空', context: { errorCode: -1 } })
  remark: string


}