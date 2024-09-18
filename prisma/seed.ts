import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Seed admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    console.log({ admin });

    // Create some initial tasks
    const task1 = await prisma.task.create({
        data: {
            title: 'Setup project',
            description: 'Initial project setup and configuration',
            status: 'OPEN',
            userId: admin.id,
        },
    });

    const task2 = await prisma.task.create({
        data: {
            title: 'Implement authentication',
            description: 'Add user authentication and authorization',
            status: 'IN_PROGRESS',
            userId: admin.id,
            dependencyId: task1.id,
        },
    });

    console.log({ task1, task2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
