import { mastra } from "@/mastra";

export async function POST(req: Request) {
  const { messages, resourceId } = await req.json();
  console.log({ resourceId });
  const myAgent = mastra.getAgent("myAgent");
  const stream = await myAgent.stream(messages);

  return stream.toDataStreamResponse();
}
