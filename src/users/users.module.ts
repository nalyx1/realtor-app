import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, HashModule],
  exports: [UsersService],
})
export class UsersModule {}
