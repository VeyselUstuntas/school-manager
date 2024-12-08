import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './_common/config';
import { ParentModule } from './parent/parent.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    StudentsModule,
    AuthModule,
    /* 
      uygulama conf. yönetmek için kullanılan bir modül. 
      konfigrasyonları merkezi bir yerde tanımlayıp yönetmemize yardımcı olur. cache conf verilerinin belleğe alınmasını ve daha hızlı işlenmesini sağlar. 

      isGlobal uygulama genelinde kullanılmaısnı sağlar bu ayarlamaların 

      load ise bu config ayalarını ayarladığımız dosyayı yuklmeke için kullanılır 

      kısaca tüm konfigürasyonları yükler ve kullanılabilir hale gelir. db yapınlanıdrmaları burda tanımlanır. 

    */
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [DatabaseConfig],
    }),

    /*
      veritabanı bağlantısın yönetmek için kullanılan orm modülüdür. 

      ortam değişkenlerinden veya ConfigServis gibi hizmetlerden alınan ayarlarla gerçekleştir.

      database ile tanımlanan dosyadan ayarlamalaır çeker. 

      veritabanı bağlantısı için gerekli ayarlar ConfigService arayıcılıyla ConfModul den çekilr bağlantı sağlanır

    */
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService) => ({
        ...configService.get('database') // tanımlanan db yapılandırmaları alınır
      }),
      inject:[ConfigService]

    }),
    ParentModule,
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
