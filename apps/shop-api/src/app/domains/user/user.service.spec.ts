import {Repository} from "typeorm";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {NotAcceptableException} from "@nestjs/common";

import * as uuid from 'uuid';
jest.mock('uuid');

import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

describe('UserService', () => {

  let userRepo: Repository<User>
  let userService: UserService


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          }
        }
      ],
    }).compile();

    userRepo = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    userService = moduleRef.get<UserService>(UserService);
  })

  describe('#emailExists', () => {

    it('should return true if email exists', async () => {
      // GIVEN
      const user = new User();
      jest.spyOn(userRepo, 'findOneBy').mockReturnValueOnce(Promise.resolve(user))

      // WHEN
      const result = await userService.emailExists('example@email.com');

      // THEN
      expect(result).toBe(true);
    });

    it('should return false if email doesn\'t exist', async () => {
      // GIVEN
      jest.spyOn(userRepo, 'findOneBy').mockReturnValueOnce(Promise.resolve(null))

      // WHEN
      const result = await userService.emailExists('example@email.com');

      // THEN
      expect(result).toBe(false);
    });

  });

  describe('#findUserByEmail', () => {
    it('should return user by email', async () => {
      // GIVEN
      const email = 'example@email.com';
      const user = new User();
      const findOneBySpy = jest.spyOn(userRepo, 'findOneBy').mockReturnValueOnce(Promise.resolve(user));

      // WHEN
      const result = await userService.findUserByEmail(email);

      // THEN
      expect(result).toEqual(user);
      expect(findOneBySpy).toHaveBeenCalledWith({ email })
    });
  });

  describe('#findUserByEmail', () => {

    it('should throw an error if user with that email already exists', async () => {
      // GIVEN
        jest.spyOn(userService, 'emailExists').mockReturnValueOnce(Promise.resolve(true))

      try {
        // WHEN
        await userService.createUser('example@email.com', '123')

      } catch (e: any) {
        // THEN
        expect(e.message).toBe('Email example@email.com already exists in db')
        expect(e).toBeInstanceOf(NotAcceptableException)
      }

    });

    it('should return the created user', async () => {
      // GIVEN
      const email = 'example@email.com'
      const password = 'ExamplePassword!@#123'
      const user = new User()

      const userRepoCreateSpy = jest.spyOn(userRepo, 'create')
      jest.spyOn(userService, 'emailExists').mockReturnValueOnce(Promise.resolve(false))
      jest.spyOn(userRepo, 'save').mockReturnValueOnce(Promise.resolve(user))
      jest.spyOn(uuid, 'v4').mockReturnValueOnce('123456789')
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.resolve(password))

      // WHEN
      const result = await userService.createUser(email, password);

      // THEN
      expect(result).toEqual(user);
      expect(userRepoCreateSpy).toHaveBeenCalledWith({
        emailActivationCode: '123456789',
        email, password
      })
    });

  });



});
