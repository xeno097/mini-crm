import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { GqlJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { idFieldOptions } from 'src/shared/graphql/constants.graphql';
import { InputName } from 'src/shared/graphql/enum/input-name.enum';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/address/update-address.dto';
import { CreateAddressInputType } from './graphql/input-type/address/create-address.input-type';
import { UpdateAddressInputType } from './graphql/input-type/address/update-address.input-type';
import { AddressType } from './graphql/object-type/address.object-type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => AddressType)
  public async createAddress(
    @Args(InputName.INPUT) input: CreateAddressInputType,
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<AddressType> {
    const { id } = jwtPayloadDto;

    const [err, res] = await this.addressService.createAddress(id, input);

    if (err) {
      throw err;
    }

    return res;
  }

  @Mutation(() => AddressType)
  public async updateAddress(
    @Args(InputName.INPUT) input: UpdateAddressInputType,
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<AddressType> {
    const { id } = jwtPayloadDto;
    const { payload, where } = input;

    const updateAddressDto: UpdateAddressDto = {
      getOneEntityDto: where,
      updateEntityPayload: payload,
    };

    const [err, res] = await this.addressService.updateAddress(
      id,
      updateAddressDto,
    );

    if (err) {
      throw err;
    }

    return res;
  }

  @Mutation(() => AddressType)
  public async deleteAddressById(
    @Args(InputName.ID, idFieldOptions) addressId: string,
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<AddressType> {
    const { id } = jwtPayloadDto;

    const [err, res] = await this.addressService.deleteAddress(id, addressId);

    if (err) {
      throw err;
    }

    return res;
  }
}
