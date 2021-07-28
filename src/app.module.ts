import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv'
import { entities } from './entities';
import { modules } from './modules';
// import { UserService } from './user/user.service';
// import { UserController } from './user/user.controller';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      type: 'postgres',
      synchronize: true,
      entities: [
        ...entities
      ],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }

    }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
