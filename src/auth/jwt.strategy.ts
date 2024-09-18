import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hardcoded_secret',
        });
    }

    async validate(payload: any) {
        console.log('Payload in JwtStrategy:', payload);
        const user = await this.prisma.user.findUnique({ where: { id: payload.userId } });
        if (!user) {
            throw new UnauthorizedException();
        }
        console.log('User found:', user);
        return user;
    }
}
