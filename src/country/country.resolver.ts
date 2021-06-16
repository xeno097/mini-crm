import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import {
  filterInputOptions,
  idFieldOptions,
} from 'src/shared/graphql/constants.graphql';
import { InputName } from 'src/shared/graphql/enum/input-name.enum';
import { FilterInputType } from 'src/shared/graphql/input-type/filter.input-type';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { Role } from 'src/user/enum/role.enum';
import { CountryService } from './country.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCountryInputType } from './graphql/input-type/create-country.input-type';
import { UpdateCountryInputType } from './graphql/input-type/update-country.input-type';
import { CountryType } from './graphql/object-type/country.object-type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => CountryType)
  public async getCountryById(
    @Args(InputName.ID, idFieldOptions) id: string,
  ): Promise<CountryType> {
    const [err, country] = await this.countryService.getOneCountry({ id });

    if (err) {
      throw err;
    }

    return country;
  }

  @Query(() => [CountryType])
  public async getCountries(
    @Args(InputName.INPUT, filterInputOptions) input: FilterInputType,
  ): Promise<CountryType[]> {
    const [err, Countrys] = await this.countryService.getCountries(input);

    if (err) {
      throw err;
    }

    return Countrys;
  }

  @Mutation(() => CountryType)
  @AuthorizedRoles(Role.ADMIN, Role.CUSTOMER_CARE)
  public async createCountry(
    @Args(InputName.INPUT) input: CreateCountryInputType,
  ): Promise<CountryType> {
    const [err, Country] = await this.countryService.createCountry(input);

    if (err) {
      throw err;
    }

    return Country;
  }

  @Mutation(() => CountryType)
  @AuthorizedRoles(Role.ADMIN)
  public async updateCountry(
    @Args(InputName.INPUT) input: UpdateCountryInputType,
  ): Promise<CountryType> {
    const { where, payload } = input;

    const updateCountryDto: UpdateCountryDto = {
      getOneEntityDto: where,
      updateEntityPayload: payload,
    };

    const [err, Country] = await this.countryService.updateCountry(
      updateCountryDto,
    );

    if (err) {
      throw err;
    }

    return Country;
  }

  @Mutation(() => CountryType)
  @AuthorizedRoles(Role.ADMIN)
  public async deleteCountryById(
    @Args(InputName.ID, idFieldOptions) id: string,
  ): Promise<CountryType> {
    const [err, Country] = await this.countryService.deleteOneCountry({ id });

    if (err) {
      throw err;
    }

    return Country;
  }
}
