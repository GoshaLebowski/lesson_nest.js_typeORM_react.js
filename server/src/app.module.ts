import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {CategoryModule} from './category/category.module';
import {AuthModule} from './auth/auth.module';
import {TransactionModule} from './transaction/transaction.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UserModule,
        CategoryModule,
        AuthModule,
        TransactionModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: parseInt(configService.get<string>('DB_PORT'), 5432),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                synchronize: true,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
            }),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
