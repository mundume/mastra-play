import Chat from "@/components/custom/chat";
import Init from "@/components/init";
import { cookies } from "next/headers";

export default async function Home() {
  const resourceId = (await cookies()).get("resourceId")?.value;

  return (
    <div>
      <Init resourceId={resourceId!} />
    </div>
  );
}
