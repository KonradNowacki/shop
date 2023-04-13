import {Body, Controller, Post} from "@nestjs/common";
import {UserCreateDto} from "./dto/user-create.dto";
import {UserService} from "./user.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly userService: UserService) {
  }

  @Post('signup')
  signup(@Body() { email, password }: UserCreateDto) {
    this.userService.createUser(email, password)
  }

}
