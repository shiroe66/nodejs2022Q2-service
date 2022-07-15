import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryDB } from 'src/helpers/InMemoryDB';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryDB],
})
export class UserModule {}
