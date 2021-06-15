import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './entities/UserRoles';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private customersService: CustomersService,
    private jwtService: JwtService
  ) {}

  async onModuleInit() {
    if(process.env.NODE_ENV !== 'production') {
      const super_admins = await this.userModel.find({role: UserRoles.SUPER_ADMIN})
      if(super_admins.length === 0) {
        const new_super_admin = new this.userModel({
          user_name: 'superadmin',
          first_name: 'superadmin',
          last_name: 'superadmin',
          email: 'superadmin@gmail.com',
          password: await bcrypt.hash('superadmin', 10),
          role: UserRoles.SUPER_ADMIN
        })
        await new_super_admin.save()
        console.log('SUPER_ADMIN_CREATED: >> ', new_super_admin)
      }
    }
  }

  async createCustomer(createUserDto: CreateUserDto) {
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) throw new BadRequestException();
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const u = new this.userModel({
      ...createUserDto,
      role: UserRoles.CUSTOMER,
    });
    await u.save();
    return await this.customersService.create(u._id);
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) throw new BadRequestException();
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const u = new this.userModel({ ...createUserDto, role: UserRoles.ADMIN });
    return await u.save();
  }

  async loginAdmin(loginUserDto: LoginUserDto) {
    const userExist = await this.findOneByEmail(loginUserDto.email);
    if (!userExist || userExist.role === UserRoles.CUSTOMER) throw new BadRequestException();
    const token = this.jwtService.sign({id: userExist._id, email: userExist.email, role: userExist.role})
    return {token, user: userExist};
  }

  async loginCustomer(loginUserDto: LoginUserDto) {
    const userExist = await this.findOneByEmail(loginUserDto.email);
    if (!userExist || userExist.role !== UserRoles.CUSTOMER) throw new BadRequestException();
    const token = this.jwtService.sign({id: userExist._id, email: userExist.email, role: userExist.role})
    return {token, user: userExist};
  }

  findAll() {
    return this.userModel.find({});
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
