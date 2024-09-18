import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

registerEnumType(Role, {
    name: 'Role',
});

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    email: string;

    @Field(() => Role)
    role: Role;

    @Field(() => [Task], { nullable: true })
    tasks?: Task[];
}
