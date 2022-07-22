import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDB } from '../../helpers/InMemoryDB';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...CreateUserDto,
        id: uuidv4(),
        version: 1,
        createdAt: +new Date(),
        updatedAt: +new Date(),
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // async findOne(id: string): Promise<User> {
  //   const user = await this.prismaService.user.findUnique({ select: { id } });

  // if (!user) {
  //   throw new NotFoundException(`user with id ${id} not found`);
  // }

  //   return user;
  // }

  // update(id: string, UpdateUserDto: UpdateUserDto): User {
  //   const user = this.inMemoryDB.findOne(id);
  //   const { oldPassword, newPassword } = UpdateUserDto;

  //   if (!user) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }

  //   if (user.password !== oldPassword) {
  //     throw new ForbiddenException('Old password is wrong');
  //   }

  //   return this.inMemoryDB.update(id, {
  //     ...user,
  //     password: newPassword,
  //     version: ++user.version,
  //     updatedAt: +new Date(),
  //   });
  // }

  // remove(id: string): string {
  //   const isRemoved = this.inMemoryDB.delete(id);

  //   if (isRemoved) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }

  //   return `User with id: ${id} removed`;
  // }
}
