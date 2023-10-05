import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashService } from 'src/hash/hash.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}
  async create({ name, phone, email, password, role_id }: CreateUserDto) {
    const userExists = await this.findOneByEmail(email);

    if (userExists) throw new BadRequestException('Email already exists');

    const hashedPassword = await this.hashService.hashPassword(password);

    return this.prismaService.user.create({
      data: {
        id: randomUUID(),
        name,
        phone,
        email,
        password: hashedPassword,
        role_id,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
