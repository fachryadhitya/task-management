import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Used @Global() to make the PrismaService available globally
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }
