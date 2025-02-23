"use server";

import { z } from "zod";
import { actionClient } from ".";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const createThread = actionClient
  .metadata({ actionName: "createThread" })
  .schema(z.object({ title: z.string() }))
  .action(async ({ ctx, parsedInput: { title } }) => {
    const resourceId = (await cookies()).get("resourceId")?.value;

    if (!resourceId) throw new Error("Could not create thread");

    const thread = await ctx.mastra.memory?.createThread({
      title,
      resourceId,
    });

    if (!thread) throw new Error("Could not create thread");

    redirect(`/chat/${thread.id}`);
  });
