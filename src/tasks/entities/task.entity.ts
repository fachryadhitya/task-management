import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

export enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

registerEnumType(Status, {
    name: 'Status',
});

@ObjectType()
export class Task {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => Status)
    status: Status;

    @Field(() => Task, { nullable: true })
    dependency?: Task;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => User)
    user: User;
}
