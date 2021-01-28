import faker from "faker";
import { resetDatabase } from "meteor/xolvio:cleaner";

function generateUsers() {
  faker.locale = "fr";

  Accounts.createUser({
    createdAt: new Date(),
    password: "password",
    email: "user@user.com",
    profile: {
      firstName: "user",
      lastName: "user"
    }
  });

  for (let i = 0; i < 9; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = `${firstName}.${lastName}@gmail.com`;

    const userData = {
      createdAt: new Date(),
      password: "password",
      email,
      profile: {
        firstName,
        lastName
      }
    };
    Accounts.createUser(userData);
  }
}

export const initData = function () {
  resetDatabase();
  generateUsers();
};
