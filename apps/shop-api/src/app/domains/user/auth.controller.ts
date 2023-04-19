import {Body, Controller, Logger, Post, UseGuards} from "@nestjs/common";
import {UserCreateDto} from "./dto/user-create.dto";
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly userService: UserService) {
  }

  @Post('signup')
  signup(@Body() { email, password }: UserCreateDto): void {
    this.logger.log(`${AuthController.name} invoked signup with email ${email} and password ${password}`)
    this.userService.createUser(email, password)
  }

}
