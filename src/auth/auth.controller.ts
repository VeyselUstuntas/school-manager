import { BadGatewayException, Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/Login.request.dto';
import { Response } from 'express';
import { LoginResponse, LoginResponseDto } from './dto/response/Login.response.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/Responsemessages.enum';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/request/Register.request.dto';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { RegisterResponse, RegisterResponseDto } from './dto/response/Register.response.dto';
import { ParentMapper } from 'src/_common/mapper/Parent.mapper';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginRequestDto, @Res() res: Response<LoginResponseDto>): Promise<void> {
        try {
            const result: { user: any, accessToken: string, refreshToken: string } = await this.authService.login(body);
            res.json(new BaseResponse(
                {
                    user: ParentMapper.toUserDto(result.user),
                    refreshToken: result.refreshToken,
                    accessToken: result.accessToken
                },
                ResponseMessages.SUCCESS,
                true));
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    @Post('register')
    async register(@Body() body: RegisterRequestDto, @Res() res: Response<RegisterResponseDto>): Promise<void> {
        try {
            if (body.userType === UserTypes.STUDENT)
                throw new BadGatewayException(ResponseMessages.USER_TYPE_NOT_VALID_FOR_REGISTER);

            const result: { user: any, accessToken: string, refreshToken: string } = await this.authService.register(body);
            res.json(new BaseResponse(
                {
                    user: ParentMapper.toUserDto(result.user),
                    refreshToken: result.refreshToken,
                    accessToken: result.accessToken
                },
                ResponseMessages.SUCCESS,
                true));
        } catch (ex) {
            throw ex;
        }
    }

    @Post('logout')
    logout() {

    }

    @Post('refresh-token')
    refreshToken(@Body() body: any) {

    }
}
