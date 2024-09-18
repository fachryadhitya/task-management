import { InputType, Field, Int } from '@nestjs/graphql';
import { Status } from '../entities/task.entity';

@InputType()
export class CreateTaskInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => Status)
    status: Status;

    @Field(() => Int, { nullable: true })
    dependencyId?: number | null;
}
