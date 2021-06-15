import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvKey } from 'src/config/enum/env-key.enum';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get(EnvKey.ACCESS_TOKEN_SECRET),
          signOptions: {
            expiresIn: configService.get(EnvKey.ACCESS_TOKEN_EXP),
          },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class CommonJwtModule {}
