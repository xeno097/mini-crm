import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { GetAuthByEmailDto } from './get-auth-by-email.dto';
import { UpdateAuthPayloadDto } from './update-auth-payload.dto';

export class UpdateAuthDto implements IUpdateEntityDto {
  getOneEntityDto: GetAuthByEmailDto;
  updateEntityPayload: UpdateAuthPayloadDto;
}
