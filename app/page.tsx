import ChatHeader from "@/components/ui/ChatHeader";
import InitUser from "@/lib/store/InitUser";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.getUser();

  if (error) {
  }

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md">
          <ChatHeader user={data.user || undefined} />
        </div>
      </div>
      <InitUser user={data.user || undefined} />
    </>
  );
}
