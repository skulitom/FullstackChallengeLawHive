import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { TypegooseModule  } from 'nestjs-typegoose';

@Module({
  imports: [JobModule,
    TypegooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
