import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getOneUser(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, UserDto]> {
    const user = await this.userRepository.getOneEntity(getOneEntityDto);

    return user;
  }

  public async getUsers(): Promise<[Error, UserDto[]]> {
    const users = await this.userRepository.getEntities();

    return users;
  }

  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<[Error, UserDto]> {
    const newUser = await this.userRepository.createEntity(createUserDto);

    return newUser;
  }

  public async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<[Error, UserDto]> {
    const updatedUser = await this.userRepository.updateEntity(updateUserDto);

    return updatedUser;
  }

  public async deleteOneUser(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, UserDto]> {
    const deletedUser = await this.userRepository.deleteOneEntity(
      getOneEntityDto,
    );

    return deletedUser;
  }
}
