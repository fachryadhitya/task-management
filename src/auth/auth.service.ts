import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupInput, LoginInput, AuthPayload } from './dto/auth.dto';
import { User, Role } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(signupInput: SignupInput): Promise<AuthPayload> {

        const isUserExists = await this.prisma.user.findUnique({ where: { email: signupInput.email } });
        if (isUserExists) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(signupInput.password, 10);
        const createdUser = await this.prisma.user.create({
            data: {
                email: signupInput.email,
                password: hashedPassword,
                role: signupInput.role || Role.USER,
            },
        });

        const token = this.jwtService.sign({ userId: createdUser.id });


        const user: User = {
            id: createdUser.id,
            email: createdUser.email,
            role: createdUser.role as Role,
        };

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

        const userWithoutPassword: User = {
            id: user.id,
            email: user.email,
            role: user.role as Role,
        };

        return { token, user: userWithoutPassword };
    }

    async validateUser(userId: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) return null;

        const validatedUser: User = {
            id: user.id,
            email: user.email,
            role: user.role as Role,
        };

        return validatedUser;
    }
}
