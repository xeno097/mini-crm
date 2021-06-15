import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  CUSTOMER_CARE = 'customer-care',
  CLIENT = 'client',
}

registerEnumType(Role, {
  name: 'Role',
});
