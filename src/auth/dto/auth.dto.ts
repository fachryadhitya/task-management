import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Role, User } from '../../users/entities/user.entity';

@InputType()
export class SignupInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => Role, { nullable: true })
    role?: Role;
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
