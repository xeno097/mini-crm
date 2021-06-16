import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UserRepository } from './user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './database/user.entity';
import { CommonJwtModule } from 'src/common-jwt/common-jwt.module';
import { AddressResolver } from './address/address.resolver';
import { AddressService } from './address/address.service';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserEntitySchema,
      },
    ]),
    CommonJwtModule,
    CountryModule,
  ],
  providers: [
    UserResolver,
    AddressResolver,
    UserService,
    AddressService,
    UserRepository,
  ],
  exports: [MongooseModule],
})
export class UserModule {}
