import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    if (body.username === 'admin' && body.password === 'admin') {
      return this.authService.login({ id: 1, role: 'admin' });
    }
    return { error: 'Credenciales incorrectas' };
  }
}
