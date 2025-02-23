import { mastra } from "@/mastra";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const myAgent = mastra.getAgent("myAgent");
  const stream = await myAgent.stream(messages);

  return stream.toDataStreamResponse();
}
