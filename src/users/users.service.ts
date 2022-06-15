import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      permissions: ['test'],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      permissions: ['test2'],
    },
  ];

  async findOne(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }
  //TODO BRING FROM ROLES OR PROFILES
  async getUserPermissions(userName: string): Promise<string[]> {
    const user = await this.findOne(userName);
    return user.permissions;
  }
}

const visualizer = {
  permissions: ['perm1,perm2,perm3'],
};

const admin = {
  permissions: ['perm1,perm2,perm3'],
};

const user = {
  userId: 1,
  username: 'john',
  password: 'changeme',
  profiles: [admin, visualizer], //o roles
};
