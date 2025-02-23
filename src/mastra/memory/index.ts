import { Memory } from "@mastra/memory";
import { PostgresStore } from "@mastra/pg";

export const memory = new Memory({
  storage: new PostgresStore({ connectionString: process.env.DATABASE_URL! }),
  options: { lastMessages: 10 },
});
