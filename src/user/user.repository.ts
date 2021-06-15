import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './database/user.entity';
import { UserDto } from './dto/user/user.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<UserEntity> {
    const entity = await this.userModel.findOne(getOneEntityDto);

    if (!entity) {
      throw new Error('User not found');
    }

    return entity;
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, UserDto]> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto);

      const res = UserEntity.toDto(entity);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(filter = {}): Promise<[Error, UserDto[]]> {
    try {
      const entities = await this.userModel.find();

      const res: UserDto[] = entities.map(entity => {
        return UserEntity.toDto(entity);
      });

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async createEntity(
    createEntityDto: CreateUserDto,
  ): Promise<[Error, UserDto]> {
    try {
      const newEntity = new this.userModel(createEntityDto);

      await newEntity.save();

      const res = UserEntity.toDto(newEntity);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateUserDto,
  ): Promise<[Error, UserDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      entityToUpdate.set(updateEntityPayload);

      await entityToUpdate.save();

      const res = UserEntity.toDto(entityToUpdate);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[Error, UserDto]> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto);

      await entity.delete();

      const res = UserEntity.toDto(entity);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }
}
