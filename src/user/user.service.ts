import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user/user.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { FilterDto } from 'src/shared/dto/filter.dto';
import { Role } from './enum/role.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getOneUser(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, UserDto]> {
    const user = await this.userRepository.getOneEntity(getOneEntityDto);

    return user;
  }

  public async getUsers(input: FilterDto = {}): Promise<[Error, UserDto[]]> {
    const users = await this.userRepository.getEntities(input);

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

  // Business Logic
  public async getClients(filterDto: FilterDto): Promise<[Error, UserDto[]]> {
    const { filter, limit, start } = filterDto;

    const newFilterDto: FilterDto = {
      limit,
      start,
      filter: {
        ...filter,
        role: Role.CLIENT,
      },
    };

    const users = await this.userRepository.getEntities(newFilterDto);

    return users;
  }

  public async getCustomerCare(
    filterDto: FilterDto,
  ): Promise<[Error, UserDto[]]> {
    const { filter, limit, start } = filterDto;

    const newFilterDto: FilterDto = {
      limit,
      start,
      filter: {
        ...filter,
        role: Role.CUSTOMER_CARE,
      },
    };

    const users = await this.userRepository.getEntities(newFilterDto);

    return users;
  }
}
