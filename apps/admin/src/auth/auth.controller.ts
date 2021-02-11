import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import {UserDocumentType, UserModel} from "libs/db/models/user.model";
import {RegisterDto} from "./dtos/register.dto";
import {LoginDto} from "./dtos/login.dto";
import {AuthService} from "./auth.service";
import {CurrentUser} from "@app/common/ParamDecorators/user.decorator";
import {AuthTagDto} from "../tags/dtos/auth-tag.dto";
import {CreateAdminDto} from "./dtos/create-admin.dto";
import {AuthAdminDto} from "./dtos/auth-admin.dto";
import {ResponseResult} from "@app/common/Results/response.result";
import {ChangeLevelDto} from "./dtos/change-level.dto";


@ApiTags('用户相关接口')
@Controller('')
export class AuthController {

  constructor(
    private readonly AuthService: AuthService
  ) {}


  /* 登录 */
  @Post('login')
  @UseGuards(AuthGuard('admin_local'))
  @ApiOperation({ summary: '用户登录' })
  async login(@CurrentUser('info') user: UserDocumentType, @Body() loginDto: LoginDto): Promise<ResponseResult<any>> {

    return await this.AuthService.login(user)
  }

  /* 注册 */
  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() registerDto: RegisterDto) {

    return await this.AuthService.register(registerDto)
  }


  /* 更改用户等级 */
  @Post('changeLevel')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '改变用户等级' })
  async changeLevel(@Body() dto: ChangeLevelDto) {

    return await this.AuthService.changeLevel(dto)
  }

  /* 申请成为管理员 */
  @Post('applyAdmin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '申请成为管理员' })
  async applyAdmin(@Body() createAdmin: CreateAdminDto) {

    return await this.AuthService.applyAdmin(createAdmin)
  }

  /* 审核管理员 */
  @Post('authAdmin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin_jwt'))
  @ApiOperation({ summary: '审核管理员' })
  async auth(@Body() authAdminDto : AuthAdminDto, @CurrentUser('admin') userInfo: UserDocumentType) {
    return await this.AuthService.auth(authAdminDto)
  }


  /* 获取用户信息 */
  @Get('get_user_info')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('admin_jwt'))
  async userInfo(@CurrentUser() user: UserDocumentType): Promise<ResponseResult<UserModel>> {
    return await this.AuthService.userInfo(user)
  }
}
