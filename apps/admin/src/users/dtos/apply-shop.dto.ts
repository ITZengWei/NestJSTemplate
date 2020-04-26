import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ApplyShopDto {

  @ApiProperty({ description: '店铺名称', example: '店铺名称' })
  @IsNotEmpty({ message: '店铺名称是不可少的', context: { errorCode:  1/*ApiErrorCode.USER_NAME_INVALID*/ } })
  readonly name: string

}