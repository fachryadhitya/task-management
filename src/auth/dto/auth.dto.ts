import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class SignupInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class AuthPayload {
    @Field()
    token: string;

    @Field(() => User)
    user: User;
}
