import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateUserPayloadDto } from './update-user-payload.dto';

export class UpdateUserDto implements IUpdateEntityDto {
  getOneEntityDto: Record<string, any>;
  updateEntityPayload: UpdateUserPayloadDto;
}
