import Chat from "@/components/custom/chat";
import { cookies } from "next/headers";

export default async function Home() {
  const resourceId = (await cookies()).get("resourceId")?.value;

  return (
    <div>
      <Chat resourceId={resourceId!} />
    </div>
  );
}
