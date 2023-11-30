import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/tasks/dto/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){}

    async getAllUsers() : Promise<User[]>{
       const query = this.userRepository.createQueryBuilder('user');
       return await query.getMany();
    }

    async createUser(createUserDto: CreateUserDto) : Promise<User> {
        const user = new User();

        const {name, city,phone_no,aadhaar} = createUserDto;

        user.name = name;
        user.aadhaar = aadhaar;
        user.city = city;
        user.phone_no = phone_no;
        
        user.date = new Date();
        return await user.save();
    }

    async getCities() : Promise <User[]>{
        const query = this.userRepository.createQueryBuilder('user')
        .select(["user.city"])
        .orderBy("user.city","ASC")
        .distinctOn(["user.city"]);
        return await query.getMany();
    }

    async getNumbers(number : string) : Promise<User[]>{
        const query = this.userRepository.createQueryBuilder('user')
        .andWhere("user.phone_no LIKE :search",{search : `${number}%`})
        return query.getMany()
    }

    async getAllUsersCreatedYesterday() : Promise<User[]>{
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() -1);
        yesterday.setHours(0,0,0,0);
        
        const today = new Date();
        today.setHours(0,0,0,0);

        return await this.userRepository.createQueryBuilder('user')
        .where('user.date >= :yesterday',{yesterday})
        .andWhere('user.date < :today', {today})
        .getMany();
    }

    async updateUser(id : number, phone_no : string, city : string) {
        const user = await this.userRepository.findOne({where: {
            s_no : id
        }});

        if(!user) {
            throw new NotFoundException(`User with s_no ${id} not found`);
        }

        if(phone_no.length !== 10) {
            throw new NotAcceptableException(`Phone no length not exactly 10`);
        }
        user.phone_no = phone_no;
        user.city = city;
        return await user.save();
    }

    async getUsersByRange(startDate : Date, endDate : Date) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        return await this.userRepository.createQueryBuilder('user')
        .where('user.date >= :startDate', {startDate})
        .andWhere('user.date <= :endDate', {endDate})
        .getMany();
    }

    async duplicateUsers() : Promise<void>{
        const users = await this.userRepository.find();
        if(!users.length) {
            throw new NotFoundException("DB is empty");
        }
        users.forEach( (user) => {
            const newUser = new User();
            
            newUser.name = user.name;
            newUser.aadhaar = user.aadhaar;
            newUser.city = user.city;
            newUser.phone_no = user.phone_no;
            // newUser.date = user.date;
            newUser.save();
        });
    }
}
