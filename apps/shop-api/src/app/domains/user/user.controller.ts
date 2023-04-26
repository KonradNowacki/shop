import {
  Body,
  Controller,
  Logger,
  Post, Request, UseGuards
} from "@nestjs/common";
import {UserCreateDto} from "./dto/user-create.dto";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {AuthService} from "../auth/auth.service";
import {SigninDto} from "./dto/signin.dto";

@Controller('auth')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Post('signup')
  async signup(@Body() { email, password }: UserCreateDto): Promise<User> {
    this.logger.log(`${UserController.name} invoked signup with email ${email}`)
    return await this.userService.createUser(email, password)
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() {email}: SigninDto) {
    this.logger.log(`${UserController.name} invoked signin with email ${email}`)
    return this.authService.login(email)
  }

}
