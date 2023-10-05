import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser({ email, password: pass }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await this.hashService.comparePassword(
      pass,
      user.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
    };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
