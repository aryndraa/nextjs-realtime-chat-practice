import ChatAbout from "@/components/ChatAbout";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
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
        <div className="h-full border rounded-md flex flex-col">
          <ChatHeader user={data.user || undefined} />
          {data.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.user || undefined} />
    </>
  );
}
