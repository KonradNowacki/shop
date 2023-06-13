import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import {
  AccessTokenDto,
  SigninDto,
  UserCreateDto,
  UserExistsDto,
} from '@shop/common-api';
import { ApiTags } from '@nestjs/swagger';

@UsePipes(new ValidationPipe())
@ApiTags('auth')
@Controller('auth')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() { email, password }: UserCreateDto): Promise<User> {
    this.logger.log(
      `${UserController.name} invoked signup with email ${email}`
    );
    return await this.userService.createUser(email, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() { email }: SigninDto): Promise<AccessTokenDto> {
    this.logger.log(
      `${UserController.name} invoked signin with email ${email}`
    );
    return this.authService.login(email);
  }

  @Post('user-exists')
  async userExist(@Body() { email }: UserExistsDto): Promise<boolean> {
    this.logger.log(
      `${UserController.name} invoked userExist with email ${email}`
    );
    return await this.userService.emailExists(email);
  }
}
