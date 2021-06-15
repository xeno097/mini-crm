import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { CountryRepository } from './country.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryEntity, CountryEntitySchema } from './database/country.entity';
import { CommonJwtModule } from 'src/common-jwt/common-jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CountryEntity.name,
        schema: CountryEntitySchema,
      },
    ]),
    CommonJwtModule,
  ],
  providers: [CountryResolver, CountryService, CountryRepository],
  exports: [MongooseModule],
})
export class CountryModule {}
