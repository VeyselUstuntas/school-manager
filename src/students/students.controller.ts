import { Body, Controller, NotFoundException, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentRequestDto } from './dto/request/CreateStudent.request.dto';

@Controller('students')
export class StudentsController {

    @Post('')
    create(@Body() body : CreateStudentRequestDto){
        // throw new UnauthorizedException();
    }
}
