import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType() // Input Types are types that we can pass as arguments to graphQl
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType() // Object Types are types that we can return from graphql queries and mutations
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // @Query(() => [User])
  // users(@Ctx() { em }: MyContext): Promise<User[]> {
  //   return em.find(User, {});
  // }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext) {
    if (!req.session!.userId) {
      return null;
    } else {
      const user = await em.findOne(User, { id: req.session!.userId });
      return user;
    }
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "The username needs to be at least 3 chars long",
          },
        ],
      };
    }
    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "The password needs to be at least 6 chars long",
          },
        ],
      };
    }
    const hashedPass = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username.toLowerCase(),
      password: hashedPass,
    });
    try {
      await em.persistAndFlush(user);
    } catch (error: any) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "The user already exist",
            },
          ],
        };
      }
    }
    return {
      user,
    };
  }
  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!!user) {
      const verifyPass = await argon2.verify(user.password, options.password);
      if (!!verifyPass) {
        req.session!.userId = user.id;
        return {
          user: user,
        };
      } else {
        return {
          errors: [
            {
              field: "password",
              message: "That's not the password we expected",
            },
          ],
        };
      }
    } else {
      return {
        errors: [
          {
            field: "username",
            message: "We couldn't find that username",
          },
        ],
      };
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) username: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof username !== "undefined") {
      user.username = username;
      await em.persistAndFlush(user);
    }
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(User, { id });
    } catch {
      return false;
    }
    return true;
  }
}
