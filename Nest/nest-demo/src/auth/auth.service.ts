import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username, pass);
    if (user?.[0]?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user?.[0]?.username, sub: user?.[0]?.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
