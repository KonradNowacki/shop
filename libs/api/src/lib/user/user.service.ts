import {Injectable, InternalServerErrorException, NotAcceptableException, OnApplicationBootstrap} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {EmailString, RolesEnum} from "@shop/common-utils";

import * as bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import {Role} from "./role.entity";


@Injectable()
export class UserService implements OnApplicationBootstrap {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {
  }

  async onApplicationBootstrap(): Promise<void> {

    const userRoleExists = await this.roleRepository.findOneBy({ role: RolesEnum.USER });
    if (!userRoleExists) {
      const userRole = this.roleRepository.create({ role: RolesEnum.USER });
      await this.roleRepository.save(userRole)
    }

    const adminRoleExists = await this.roleRepository.findOneBy({ role: RolesEnum.ADMIN });
    if (!adminRoleExists) {
      const adminRole = this.roleRepository.create({ role: RolesEnum.ADMIN });
      await this.roleRepository.save(adminRole)
    }

  }



  async createUser(email: EmailString, password: string): Promise<User> {

    // Check if email unique
    const emailExists = await this.emailExists(email);
    if (emailExists) {
      throw new NotAcceptableException(`Email ${email} already exists in db`)
    }

    // TODO KN Move the logic to vaidlate function

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
    const userRole = await this.roleRepository.findOneBy({ role: RolesEnum.USER })

    if (!userRole) {
      throw new InternalServerErrorException('Cannot find User role')
    }

    const user = this.userRepository.create({
      email,
      password,
      emailActivationCode,
      roles: [userRole]
    });

    // Send confirmation email - as event to make it async?

    // Save and return user
    return this.userRepository.save(user);
  }

  async emailExists(email: EmailString): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user
  }

  async findUserByEmail(email: EmailString): Promise<User> {
    return await this.userRepository.findOneOrFail({
      relations: ['roles'],
      where: { email }
    });
  }

}
