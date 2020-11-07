import { User } from "../types.ts"

export const generateUsers = async (amount: number): Promise<(User | null)[]> => {
  let users: (User | null)[] = [null];

  const { results } = await (await fetch(`https://randomuser.me/api/?results=${amount}`)).json();

  users = results.map((user: any, index: number) => {
    return {
      id: index,
      gender: user.gender,
      name: user.name,
      email: user.email,
    };
  });
  return users;

}

