import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { dbuser } from 'src/models/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    // @UseGuards()
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get(':userID')
    getByID(@Param('userID') userID: number) {
        return this.userService.getByID(userID);
    }

    @Post('/register')
    createUser(@Body() body: dbuser) {
        return this.userService.createUser(body);
    }

    @Put()
    updateUser(@Body() body: dbuser) {
        return this.userService.updateOne(body);
    }

    @Delete(':userID')
    deleteUser(@Param('userID') userID: number) {
        return this.userService.deleteOne(userID);
    }

    @Post('login')
    userLogin(@Body() data: any) {
        return this.userService.login(data)
    }

}
