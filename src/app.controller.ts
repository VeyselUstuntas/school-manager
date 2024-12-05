import { BadGatewayException, BadRequestException, Controller, Get, NotFoundException, Res, UnauthorizedException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './_base/response/base.response';
import { ResponseMessages } from './_common/enums/Responsemessages.enum';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): BaseResponse<any> {
        const users = [{ id: 1, username: "veysel" }];
        throw new BadRequestException();
        return new BaseResponse(users,ResponseMessages.SUCCESS, true);
    }
}
