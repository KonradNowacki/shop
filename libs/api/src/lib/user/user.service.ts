import {Injectable, NotAcceptableException} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {EmailString} from "@shop/common-utils";

import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async createUser(email: EmailString, password: string): Promise<User> {

    // Check if email unique
    const emailExists = await this.emailExists(email);
    if (emailExists) {
      throw new NotAcceptableException(`Email ${email} already exists in db`)
    }

    // TODO Add password validation
    // Min 8 chars
    // Min 1 capital
    // Min 1 special
    // Min 1 number

    // Hash password
    const salt = await bcrypt.genSalt(11);
    password = await bcrypt.hash(password, salt);

    // Generate email activation code
    const emailActivationCode = uuid();

    // Create user
    const user = this.userRepository.create({
      email,
      password,
      emailActivationCode
    });

    // Send confirmation email

    // Save and return user
    return this.userRepository.save(user);
  }

  async emailExists(email: EmailString): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user
  }

  async findUserByEmail(email: EmailString): Promise<User> {
    return await this.userRepository.findOneBy({ email })
  }

}
