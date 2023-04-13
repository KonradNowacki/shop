import {Injectable} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {EmailString} from "@shop/shared-ts";


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
      // Throw custom exception
    }

    // Hash password

    // Generate email activation code


    // Create user
    const user = this.userRepository.create({ email, password});

    // Send confirmation email

    // Save and return user
    return this.userRepository.save(user);
  }

  // TODO KN Improve to EmailString
  async emailExists(email: EmailString): Promise<boolean> {
    const user = await this.userRepository.findBy({ email });

    return !!user
  }

}
