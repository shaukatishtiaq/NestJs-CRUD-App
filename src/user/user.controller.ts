import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/tasks/dto/create-user-dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.getAllUsers();
    }

    @Get('/city')
    getCities() : Promise<User[]> {
        return this.userService.getCities();
    }
    @Post()
    createTask(@Body() createUserDto : CreateUserDto) : Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get('/number')
    getNumbers(@Query('PHONE_NO') number : string) : Promise<User[]>{
        return this.userService.getNumbers(number);
    }

    @Get('/users/yesterday')
    getUsersCreatedYesterday() : Promise <User[]> {
        return this.userService.getAllUsersCreatedYesterday();
    }

    @Patch('/update/:id')
    updateUser(@Param('id') id, @Body('phone_no') phone_no, @Body('city') city) : Promise<User>{
        return this.userService.updateUser(id,phone_no,city);
    }

    @Post('/users/range')
    getUsersByRange(@Query('startDate') startDate: Date, @Query('endDate') endDate: Date) : Promise<User[]> {
        return this.userService.getUsersByRange(startDate, endDate);
    }

    @Get('/users/duplicate')
    createDuplicates() : Promise<void> {
        return this.userService.duplicateUsers();
    }
}
