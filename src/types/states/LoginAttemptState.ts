import { User } from "../../models/User";

export type LoginAttemptState = Pick<User, "username" | "password">;
//     username: User["username"]
//     password: User["password"]
// }

// export type LoginState = Pick<User, "username" | "password">