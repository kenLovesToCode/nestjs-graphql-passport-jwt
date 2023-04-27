import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { GetUserArgs } from './dto/args/get-user.args';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      email: 'kenlovestocode@gmail.com',
      password: 'kenlovestocode',
      userId: '001',
      age: 20,
    },
  ];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      ...createUserData,
      userId: uuidv4(),
    };

    this.users.push(user);
    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );
    Object.assign(user, updateUserData);
    return user;
  }

  public getUser(getUserArg: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArg.userId);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public getUsers(getUserArgs: GetUsersArgs): User[] {
    return getUserArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
}
