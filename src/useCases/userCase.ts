import { User } from "../types.ts"

export const generateUsers = async (amount: number): Promise<(User | null)[]> => {
  let users: (User | null)[] = [null];

  const { results } = await (await fetch(`https://randomuser.me/api/?results=${amount}`)).json();

  users = results.map(({gender, name, email}: Omit<User, "id">, index: number) => {
    return { id: index, gender, name, email};
  });
  return users;

}

