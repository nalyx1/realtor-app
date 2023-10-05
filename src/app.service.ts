import { Injectable } from '@nestjs/common';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}
  async createAdminUser() {
    const userExists = await this.usersService.findOneByEmail(
      process.env.ADMIN_EMAIL,
    );

    if (!userExists) {
      const adminRole = await this.rolesService.create({ name: 'ADMIN' });

      const newUser = await this.usersService.create({
        name: 'admin',
        phone: '(99) 9 9999-9999',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role_id: adminRole.id,
      });

      console.log('Usuário criado:');
      console.table(newUser);
    }
  }
}
