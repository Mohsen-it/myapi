import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { FeedController } from 'src/feed/controllers/feed.controller';
import { FeedService } from 'src/feed/sevices/feed.service';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { FriendRequestEntity } from './models/friend-request.entity';
@Module({
    imports: [
      JwtModule.registerAsync({
        useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '3600s' },
        }),
      }),
      TypeOrmModule.forFeature([UserEntity, FriendRequestEntity]),
    ],
    providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard, UserService, ],
    controllers: [AuthController, UserController, ],
    exports: [AuthService,UserService ],
  })
  export class AuthModule {}
  