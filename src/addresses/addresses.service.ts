import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { UserRoles } from 'src/users/entities/UserRoles';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressDocument } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private customerService: CustomersService,
  ) {}

  async create(createAddressDto: CreateAddressDto, currentUser: User) {
    const { customer_id, ...rest } = createAddressDto;
    const c = await this.customerService.findOne(customer_id).populate('user');
    if (!c) throw new NotFoundException('Customer Not Found');
    if (
      currentUser.role === UserRoles.CUSTOMER &&
      //@ts-ignore
      c.user._id.toString() !== currentUser._id.toString()
    )
      throw new UnauthorizedException();
    console.log('CUSTOMER', c);
    const addr = await this.addressModel.create({
      customer: c._id,
      street: rest.street,
      state: rest.state,
      city: rest.city,
      zip_code: rest.zip_code,
      phone_number: rest.phone_number,
    });
    c.addresses.push(addr._id);
    await c.save();
    return addr;
    //return 'This action adds a new address';
  }

  findAll() {
    return this.addressModel.find({});
  }

  findOne(id: string) {
    return this.addressModel.findById(id);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const addr = await this.findOne(id);
    if (!addr) throw new NotFoundException('Address Not Found');

    addr.phone_number = updateAddressDto.phone_number;
    addr.street = updateAddressDto.street;
    addr.state = updateAddressDto.state;
    addr.zip_code = updateAddressDto.zip_code;
    addr.city = updateAddressDto.city;

    return await addr.save();
  }

  async remove(id: string) {
    const addr = await this.findOne(id);
    if (!addr) throw new NotFoundException('Address Not Found');
    return await addr.remove();
  }
}
