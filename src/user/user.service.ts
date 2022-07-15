import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly inMemoryDB: InMemoryDB<User>) {}

  create(CreateUserDto: CreateUserDto): User {
    const user = new User({
      ...CreateUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    });

    this.inMemoryDB.create(user);
    return user;
  }

  findAll(): User[] {
    return this.inMemoryDB.findAll();
  }

  findOne(id: string): User {
    const user = this.inMemoryDB.findOne(id);

    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }

    return user;
  }

  update(id: string, UpdateUserDto: UpdateUserDto): User {
    const user = this.inMemoryDB.findOne(id);
    const { oldPassword, newPassword } = UpdateUserDto;

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    return this.inMemoryDB.update(id, {
      ...user,
      password: newPassword,
      version: ++user.version,
      updatedAt: +new Date(),
    });
  }

  remove(id: string): string {
    const isRemoved = this.inMemoryDB.delete(id);

    if (isRemoved) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return `User with id: ${id} removed`;
  }
}
