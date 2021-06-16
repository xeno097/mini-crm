import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserEntity } from 'src/user/database/user.entity';
import { AuthEntity } from './database/auth.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/user/create-user.dto';
import { UserDto } from 'src/user/dto/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(AuthEntity.name) private readonly authModel: Model<AuthEntity>,
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<AuthEntity> {
    const entity = await this.authModel.findOne(getOneEntityDto);

    if (!entity) {
      throw new Error('Unauthorized');
    }

    return entity;
  }

  public async signUp(signInDto: SignUpDto): Promise<[Error, UserDto]> {
    const transaction = await this.connection.startSession();
    try {
      const { email, password, name, lastName, role } = signInDto;

      const newAuth = new this.authModel({ email, password });

      await newAuth.save({ session: transaction });

      const createUserDto: CreateUserDto = {
        email,
        name,
        lastName,
        role,
      };

      const newUser = new this.userModel(createUserDto);

      await newUser.save({ session: transaction });

      const res = UserEntity.toDto(newUser);

      return [null, res];
    } catch (error) {
      await transaction.abortTransaction();
      return [error, null];
    } finally {
      transaction.endSession();
    }
  }

  public async signIn(signInDto: SignInDto): Promise<[Error, UserDto]> {
    try {
      const { email, password } = signInDto;

      const auth = await this._getOneEntity({ email });

      const check = await this.comparePassword(password, auth.password);

      if (!check) {
        throw new Error('Unauthorized');
      }

      const user = await this.userModel.findOne({ email });

      const res = UserEntity.toDto(user);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateAuthDto,
  ): Promise<[Error, boolean]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      const { password, oldPassword } = updateEntityPayload;

      const check = await this.comparePassword(
        oldPassword,
        entityToUpdate.password,
      );

      if (!check) {
        throw new Error('Unauthorized');
      }

      entityToUpdate.set({ password: password });

      await entityToUpdate.save();

      return [null, true];
    } catch (error) {
      return [error, null];
    }
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const res = await bcrypt.compare(password, hashedPassword);

    return res;
  }
}
