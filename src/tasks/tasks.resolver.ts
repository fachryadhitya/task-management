import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Role, User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/current-user.decorator';


@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
    constructor(private readonly tasksService: TasksService) { }

    @Query(() => [Task])
    async tasks() {
        return this.tasksService.findAll();
    }

    @Query(() => Task)
    async task(@Args('id', { type: () => Int }) id: number) {
        return this.tasksService.findOne(id);
    }

    @Mutation(() => Task)
    createTask(
        @Args('createTaskInput') createTaskInput: CreateTaskInput,
        @CurrentUser() user: User
    ) {
        console.log('current user', user);

        return this.tasksService.create(createTaskInput, user.id);
    }


    @Mutation(() => Task)
    async updateTask(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') updateTaskInput: UpdateTaskInput,
    ) {
        return this.tasksService.update(id, updateTaskInput);
    }

    @Mutation(() => Boolean)
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async deleteTask(@Args('id', { type: () => Int }) id: number) {
        return this.tasksService.remove(id);
    }

    @Query(() => [Task])
    async readyTasks() {
        return this.tasksService.findReadyTasks();
    }
}
