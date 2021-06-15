import { Resolver } from '@nestjs/graphql';
import { CountryService } from './country.service';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}
}
