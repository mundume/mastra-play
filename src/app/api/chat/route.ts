import { mastra } from "@/mastra";
import { CoreUserMessage } from "@mastra/core";
import { memory } from "@/mastra/memory";

export async function POST(req: Request) {
  const { messages, resourceId, threadId } = await req.json();
  console.log({ resourceId });
  if (!mastra.memory) throw new Error("Mastra memory not set up");
  const myAgent = mastra.getAgent("myAgent");

  if (messages.length === 1) {
    const thread = await mastra.memory?.getThreadById({ threadId });

    if (!thread?.title || thread?.title === "New Thread") {
      const agent = mastra.getAgent("myAgent");
      const title = await agent.generateTitleFromUserMessage({
        message: messages.filter((m: CoreUserMessage) => m.role === "user")[0],
      });
      await memory.updateThread({
        id: threadId,

        title,
        metadata: { project: "mastraaa", topic: "architectureee" },
      });
    }
  }

  try {
    const res = await myAgent.stream(messages, {
      threadId,
      resourceId,
      toolChoice: "auto",
      maxSteps: 10,
    });
    return res.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
