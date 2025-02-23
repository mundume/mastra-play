import { createThread } from "@/actions/create-resource-id";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { mastra } from "@/mastra";
import Chat from "@/components/custom/chat";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [queryResponse, thread, resourceId] = await Promise.all([
    mastra.memory?.query({ threadId: (await params).slug }),
    mastra.memory?.getThreadById({ threadId: (await params).slug }),
    (await cookies()).get("resourceId")?.value,
  ]);
  const { slug } = await params;

  if (!thread || !resourceId) notFound();

  const initialMessages = (queryResponse?.uiMessages ?? []).map((m) => ({
    ...m,
    content:
      m.content === "" && !!m.toolInvocations?.length
        ? m.toolInvocations?.map((tool) => ({ ...tool, type: "tool-call" }))
        : m.content,
  }));

  return (
    <Chat
      resourceId={resourceId!}
      threadId={slug}
      //   @ts-expect-error
      initialMessages={initialMessages}
    />
  );
}
