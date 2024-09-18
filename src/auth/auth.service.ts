import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupInput, LoginInput, AuthPayload } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(signupInput: SignupInput): Promise<AuthPayload> {
        const hashedPassword = await bcrypt.hash(signupInput.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...signupInput,
                password: hashedPassword,
            },
        });

        const token = this.jwtService.sign({ userId: user.id });
        return { token, user };
    }

    async login(loginInput: LoginInput): Promise<AuthPayload> {
        const user = await this.prisma.user.findUnique({ where: { email: loginInput.email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginInput.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ userId: user.id });
        return { token, user };
    }

    async validateUser(userId: number) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
}
