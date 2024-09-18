import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput, LoginInput, AuthPayload } from './dto/auth.dto';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => AuthPayload)
    async signup(@Args('input') signupInput: SignupInput) {
        return this.authService.signup(signupInput);
    }

    @Mutation(() => AuthPayload)
    async login(@Args('input') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }
}
