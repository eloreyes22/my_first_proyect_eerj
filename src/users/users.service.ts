import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  return this.prisma.user.create({
    data: {
      ...createUserDto,
      password: hashedPassword,
    },
  });
}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  const data = { ...updateUserDto };

  if (updateUserDto.password) {
    data.password = await bcrypt.hash(updateUserDto.password, 10);
  }

  return this.prisma.user.update({
    where: { id },
    data,
  });
}

  remove(id: number) {
  return this.prisma.user.delete({
    where: { id },
  });
}
}