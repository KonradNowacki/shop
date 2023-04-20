import {Injectable, NotAcceptableException, UnauthorizedException} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {EmailString} from "@shop/shared-ts";

import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async createUser(email: EmailString, password: string) {

    // Check if email unique
    const emailExists = await this.emailExists(email);
    if (emailExists) {
      throw new NotAcceptableException(`Email ${email} already exists in db`)
    }

    // Hash password
    const salt = 11;
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
    const user = await this.userRepository.findBy({ email });
    return !!user
  }

  async signin(email: EmailString, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Incorrect password')
    }

  }

}
