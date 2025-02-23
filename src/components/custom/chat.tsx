"use client";

import { createThread } from "@/actions/create-resource-id";
import { useChat } from "@ai-sdk/react";
import { useAction } from "next-safe-action/hooks";

export default function Chat({ resourceId }: { resourceId: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      resourceId,
    },
  });

  const { execute, isPending, isExecuting } = useAction(createThread);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
