import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/all-exceptions.filter';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '89.200.217.37',
      port: 3306,
      username: 'ahmad1',
      password: '2022',
      database: 'midad',
      autoLoadEntities:true,
      synchronize:true,
    }),
    FeedModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
    provide:APP_FILTER,
    useClass:AllExceptionsFilter
  }],
})
export class AppModule {}
