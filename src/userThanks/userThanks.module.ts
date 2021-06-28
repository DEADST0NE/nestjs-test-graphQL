import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';

import { UserThanks } from './userThanks.entity';
import { UserThanksResolver } from './userThanks.resolver';
import { UserThanksService } from './userThanks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserThanks]),
  ],
  providers: [UserThanksResolver, UserThanksService],
})
export class UserThanksModule {}
