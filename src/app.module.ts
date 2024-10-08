import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { HealthModule } from './healthcheck/health.module';
import { GraphQLError } from 'graphql';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'hardcoded_secret', // just for a demo
            signOptions: { expiresIn: '1h' },
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            formatError: (error: GraphQLError) => {
                // @ts-expect-error
                const originalError = error.extensions?.exception?.response;
                if (originalError) {
                    return {
                        message: originalError.message || error.message,
                        statusCode: originalError.statusCode,
                    };
                }
                return {
                    message: error.message,
                    // @ts-expect-error
                    statusCode: error.extensions?.exception?.status || 500,
                };
            },
        }),
        AuthModule,
        TasksModule,
        PrismaModule,
        HealthModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AppModule { }

