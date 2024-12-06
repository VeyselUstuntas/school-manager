import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/Login.request.dto';
import { Response } from 'express';
import { LoginResponseDto } from './dto/response/Login.response.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/Responsemessages.enum';

@Controller('auth')
export class AuthController {
    @Post('login')
    login(@Body() body: LoginRequestDto, @Res() res: Response<LoginResponseDto>): void {
        const data = {
            accessToken: '', 
            refreshToken: '', 
            user: { name: '', lastName: '', pay: 12 }
        }
        res.json(new BaseResponse(data,ResponseMessages.SUCCESS,true));

    }

    @Post('regiser')
    register(@Body() body: any) {

    }

    @Post('logout')
    logout() {

    }

    @Post('refresh-token')
    refreshToken(@Body() body: any) {

    }
}
