import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthEntity, AuthEntitySchema } from './database/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthEntity.name,
        schema: AuthEntitySchema,
      },
    ]),
  ],
  providers: [AuthResolver, AuthService, AuthRepository],
})
export class AuthModule {}
