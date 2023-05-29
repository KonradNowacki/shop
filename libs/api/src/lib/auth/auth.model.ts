import {User} from "../user/user.entity";

export type JwtUser = {
  user: Pick<User, 'id' | 'email' | 'roles'>
}
