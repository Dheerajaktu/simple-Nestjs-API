import { Module } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbuser } from 'src/models/entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      dbuser
    ]),
    // PassportModule.register({
    //   defaultStrategy: 'jwt'
    // })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
