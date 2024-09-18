import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(createTaskInput: CreateTaskInput, userId: number) {
        console.log('userId', userId);
        const { dependencyId, ...taskData } = createTaskInput;

        const data: Prisma.TaskCreateInput = {
            ...taskData,
            user: { connect: { id: userId } },
        };

        if (dependencyId) {
            data.dependency = { connect: { id: dependencyId } };
        }

        return this.prisma.task.create({ data });
    }

    findAll() {
        return this.prisma.task.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: number) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    update(id: number, updateTaskInput: UpdateTaskInput) {
        return this.prisma.task.update({
            where: { id },
            data: updateTaskInput,
        });
    }

    remove(id: number) {
        return this.prisma.task.delete({
            where: { id },
        });
    }

    findReadyTasks() {
        return this.prisma.task.findMany({
            where: {
                OR: [
                    { dependencyId: null },
                    { dependency: { status: 'DONE' } },
                ],
            },
        });
    }
}
