import {Injectable} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async createUser(email: string, password: string) {

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
  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findBy({ email });

    return !!user
  }

}
