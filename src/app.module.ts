import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashModule } from './hash/hash.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, HashModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
