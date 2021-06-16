import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CountryRepository } from 'src/country/country.repository';
import { AddressObject } from '../database/address.object';
import { AddressDto } from '../dto/address/address.dto';
import { CreateAddressDto } from '../dto/address/create-address.dto';
import { UpdateAddressDto } from '../dto/address/update-address.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AddressService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  public async createAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<[Error, AddressDto]> {
    const [userErr, user] = await this.userRepository.getOneEntity({
      id: userId,
    });

    if (userErr) {
      return [userErr, null];
    }

    const { addresses } = user;
    const { address, country, postalCode, info } = createAddressDto;

    const [countryErr, res] = await this.countryRepository.getOneEntity({
      id: country,
    });

    if (countryErr) {
      return [countryErr, null];
    }

    const newAddress: AddressObject = {
      id: Types.ObjectId().toHexString(),
      address,
      country: res.name,
      info,
      postalCode,
    };

    const [updateAddressErr] = await this._updateAddresses(userId, [
      newAddress,
      ...addresses,
    ]);

    if (updateAddressErr) {
      return [updateAddressErr, null];
    }

    return [null, newAddress];
  }

  public async updateAddress(
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<[Error, AddressDto]> {
    const { getOneEntityDto, updateEntityPayload } = updateAddressDto;
    const { id } = getOneEntityDto;

    const [userErr, user] = await this.userRepository.getOneEntity({
      id: userId,
    });

    if (userErr) {
      return [userErr, null];
    }

    const { addresses } = user;

    const [addressToUpdate] = addresses.filter(address => {
      return address.id === id;
    });

    if (!addressToUpdate) {
      return [new Error('Address not found'), null];
    }

    const fieldsToUpdate = Object.keys(updateEntityPayload);

    for (const field of fieldsToUpdate) {
      addressToUpdate[field] = updateEntityPayload[field];

      if (field === 'country') {
        const [err, country] = await this.countryRepository.getOneEntity({
          id: updateEntityPayload[field],
        });

        if (err) {
          return [err, null];
        }

        addressToUpdate[field] = country.name;
      }
    }

    const [updateAddressErr] = await this._updateAddresses(userId, [
      ...addresses,
    ]);

    if (updateAddressErr) {
      return [updateAddressErr, null];
    }

    return [null, addressToUpdate];
  }

  public async deleteAddress(
    userId: string,
    input: string,
  ): Promise<[Error, AddressDto]> {
    const [err, user] = await this.userRepository.getOneEntity({ id: userId });

    if (err) {
      return [err, null];
    }

    const { addresses } = user;

    let deletedAddress: AddressObject;

    const updatedAddresses = addresses.filter(address => {
      const check = address.id !== input;
      if (!check) {
        deletedAddress = address;
      }

      return check;
    });

    const [updateAddressErr] = await this._updateAddresses(userId, [
      ...updatedAddresses,
    ]);

    if (updateAddressErr) {
      return [updateAddressErr, null];
    }

    return [null, deletedAddress];
  }

  private async _updateAddresses(
    userId: string,
    addresses: AddressObject[],
  ): Promise<[Error, boolean]> {
    const updateUserDto: UpdateUserDto = {
      getOneEntityDto: {
        id: userId,
      },
      updateEntityPayload: {
        addresses,
      },
    };

    const [updateUserErr, updatedUser] = await this.userRepository.updateEntity(
      updateUserDto,
    );

    if (updateUserErr) {
      return [updateUserErr, null];
    }

    return [null, !!updatedUser];
  }
}
