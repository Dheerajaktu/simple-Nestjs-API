import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { dbuser } from 'src/models/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(dbuser)
        private readonly userRepository: Repository<dbuser>
    ) { }

    /* getAll() method will fetch all users from dbuser table*/
    async getAll() {
        const userInstance: dbuser = new dbuser();
        return await this.userRepository.find({
            select: [
                'id',
                'name',
                'username',
                'email',
                'imageLarge',
                'imageSmall'
            ]
        });
    }

    async getByID(userID: number) {
        return await this.userRepository.findOne({
            where: {
                id: userID
            },
            select: [
                'id',
                'name',
                'username',
                'email',
                'imageLarge',
                'imageSmall'
            ]
        });
    }

    async createUser(body: dbuser) {
        const saveUser = await this.userRepository.save(body);
        return {
            statusCode: 201,
            message: 'User created successfully',
            id: saveUser.id
        }
    }

    async updateOne(body: dbuser) {
        /* it will update atleast one records and will return numbers so if number is > 0 then it will be TRUE*/
        let flag = false;
        flag = (await this.userRepository.update(body.id, body)).affected > 0;
        if (flag === true) {
            return {
                statusCode: 201,
                message: 'User updated successfully'
            }
        } else {
            return {
                statusCode: 500,
                message: 'Error While updating User'
            }
        }
    }

    async deleteOne(userID: number) {
        let flag = false;
        flag = (await this.userRepository.delete(userID)).affected > 0;
        if (flag) {
            return {
                statusCode: 201,
                message: 'User Deleted successfully'
            }
        } else {
            return {
                statusCode: 500,
                message: 'Error While Deleting User'
            }
        }

    }


    async login(data: any) {
        try {
            const foundUser = await this.userRepository.findOne({
                where: {
                    username: data.username
                },
                select: [
                    'id',
                    'email',
                    'username',
                    'password'
                ]
            });
            if (foundUser) {
                /*if user is valid then we create JWT token*/
                // const token = this.jwtService.sign({ id: foundUser.id })
                if (foundUser.username === data.username && foundUser.password === data.password) {
                    return {
                        statusCode: 200,
                        message: 'user found',
                        user: foundUser
                    }
                } else {
                    return {
                        statusCode: 500,
                        message: 'user not found'
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


}
