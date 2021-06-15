import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { CountryRepository } from './country.repository';

@Module({
  providers: [CountryResolver, CountryService, CountryRepository],
})
export class CountryModule {}
