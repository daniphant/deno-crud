import { Client } from "https://deno.land/x/postgres/mod.ts";
import dbauth from "./config/dbauth.ts";

const client = new Client(dbauth);

await client.connect();

export const runQuery = async (query: string) => {
  console.log(`Executing\n${query}`);
  const result = await client.query(query);
  return result.rows;
}

export const killConnection = async () => {
  await client.end();
}