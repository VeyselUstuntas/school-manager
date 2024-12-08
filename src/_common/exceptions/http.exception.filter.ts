
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from '../enums/Responsemessages.enum';
import { DtoPrefix } from '../enums/validationMessage.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const dtoPrefix = Object.values(DtoPrefix);

        // burdaki amac gelen hatada bir validataion hatası var mı yok mu diye kontrol edilmseidir. validation hatası yoksa diğer hatalar bastırılr.
        
        // dtoPrefix ile başlıyorsa bu validation hatasıdır. 
        
        const validationMessage = dtoPrefix.find(prefix => {
            return (exception.message && exception.message.startsWith(prefix));
        });

        let responseMessage: string;

        if (validationMessage) {
            responseMessage = exception.message;
        }
        else {

            switch (status) {

                case 404:
                    responseMessage = ResponseMessages.NOT_FOUND;
                    break;
                case 401:
                    responseMessage = ResponseMessages.UNAUTHORIZATION;
                    break;
                case 403:
                    responseMessage = ResponseMessages.FORBIDDEN;
                    break;
                case 400:
                    responseMessage = ResponseMessages.BAD_REQUEST;
                    break;
                case 500:
                    responseMessage = ResponseMessages.INTERNAL_SERVER_ERROR;
                    break;
                case 502:
                    responseMessage = ResponseMessages.BAD_GATEWAY;
                    break;
                default:
                    responseMessage = ResponseMessages.BAD_GATEWAY;
                    break;

            }
        }
        response
            .status(status)
            .json(new BaseResponse(null, responseMessage, false));
    }
}   
