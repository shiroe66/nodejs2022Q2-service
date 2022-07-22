import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { exclude } from 'src/helpers/excludeField';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(CreateUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const data = await this.prisma.user.create({
      data: {
        ...CreateUserDto,
        id: uuidv4(),
        version: 1,
        createdAt: +new Date(),
        updatedAt: +new Date(),
      },
    });

    return exclude(data, 'password');
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => exclude(user, 'password'));
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    return exclude(user, 'password');
  }

  async update(
    id: string,
    UpdateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const { oldPassword, newPassword } = UpdateUserDto;

    if (!user) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const data = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: ++user.version,
        updatedAt: +new Date(),
      },
    });

    return exclude(data, 'password');
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
