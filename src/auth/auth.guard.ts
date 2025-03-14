import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    let request: Request = context.switchToHttp().getRequest()
    let token = request.headers.authorization?.split(" ")[1]

    if (!token) throw new UnauthorizedException();
    try {
      let data = this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
      request['user'] = data.id
      return true;
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException();
    }
  }
}
