import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createHomeDto: CreateHomeDto) {
    return this.prismaService.home.create({
      data: createHomeDto,
    });
  }

  findAll() {
    return this.prismaService.home.findMany();
  }

  findOne(id: string) {
    return this.prismaService.home.findUnique({
      where: { id },
    });
  }

  update(id: string, updateHomeDto: UpdateHomeDto) {
    return this.prismaService.home.update({
      data: updateHomeDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.home.delete({
      where: { id },
    });
  }
}
