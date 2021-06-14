import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
constructor( @InjectModel(User.name) private userModel: Model<UserDocument>, private jwtSearvice: JwtService){}

  async use(req: Request, res: Response, next: NextFunction) {
    const authoraization_header = req.headers.authorization
    if(!authoraization_header) return next()

    const token = authoraization_header.split(' ')[1]
    console.log('TOKEN ', token)

    if(!token) return next()

    const decoded = this.jwtSearvice.decode(token)
    console.log('DECODED_TOKEN ', decoded)
    if(!decoded) return next()

    //@ts-ignore
    const u = await this.userModel.findOne({email: decoded.email as string })

    console.log('USER ', u)

    if(!u) return next()

    //@ts-ignore
    req.user = u

    next();
  }
}