import { Module } from '@nestjs/common';
import { HomesService } from './homes.service';
import { HomesController } from './homes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HomesController],
  providers: [HomesService],
  imports: [PrismaModule],
})
export class HomesModule {}
