import { Mastra } from "@mastra/core";
import { myAgent } from "./agents";
import { memory } from "./memory";

export const mastra = new Mastra({
  agents: { myAgent },
  //   @ts-ignore
  memory,
});
