import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwkKeyExportOptions } from 'crypto';
import { Request } from 'express';

export interface PayloadRequest extends Request{
usuario: {
  email: string;
  id: number
}
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
  ){}


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extracTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException('Acesso não autorizado')
    }
    
    return true;
  }
  private extracTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if(!authHeader){
      return undefined;
    }
    return authHeader;
  }
}
