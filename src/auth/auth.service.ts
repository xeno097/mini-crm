import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { Role } from 'src/user/enum/role.enum';
import { AuthRepository } from './auth.repository';
import { AuthResultDto } from './dto/auth-result.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<[Error, AuthResultDto]> {
    const clientSignUpDto: SignUpDto = {
      ...signUpDto,
      role: Role.CLIENT,
    };

    const [err, res] = await this.authRepository.signUp(clientSignUpDto);

    if (err) {
      return [err, null];
    }

    const [jwtErr, jwt] = this.generateJwt(res);

    if (jwtErr) {
      return [jwtErr, null];
    }

    const authResult = {
      jwt,
      user: res,
    };

    return [null, authResult];
  }

  public async createCustomerCare(
    signUpDto: SignUpDto,
  ): Promise<[Error, UserDto]> {
    const createCustomerCareDto: SignUpDto = {
      ...signUpDto,
      role: Role.CUSTOMER_CARE,
    };

    const res = await this.authRepository.signUp(createCustomerCareDto);

    return res;
  }

  public async signIn(signInDto: SignInDto): Promise<[Error, AuthResultDto]> {
    const [err, res] = await this.authRepository.signIn(signInDto);

    if (err) {
      return [err, null];
    }

    const [jwtErr, jwt] = this.generateJwt(res);

    if (jwtErr) {
      return [jwtErr, null];
    }

    const authResult: AuthResultDto = {
      jwt,
      user: res,
    };

    return [null, authResult];
  }

  private generateJwt(jwtPayloadDto: JwtPayloadDto): [Error, string] {
    try {
      const jwt = this.jwtService.sign(jwtPayloadDto);

      return [null, jwt];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateAuth(
    updateAuthDto: UpdateAuthDto,
  ): Promise<[Error, boolean]> {
    const res = await this.authRepository.updateEntity(updateAuthDto);

    return res;
  }
}
