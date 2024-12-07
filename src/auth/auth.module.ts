import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ParentModule } from 'src/parent/parent.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => ParentModule),
    JwtModule.register({
      secret: 'school-management',
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ]
})
export class AuthModule { }
