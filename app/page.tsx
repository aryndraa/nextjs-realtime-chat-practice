import ChatHeader from "@/components/ui/ChatHeader";
import InitUser from "@/lib/store/InitUser";
import { supabaseBrowser } from "@/utils/supabase/browser";
import React from "react";

export default async function Page() {
  const supabase = supabaseBrowser();
  const { data } = await supabase.auth.getSession();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md">
          <ChatHeader user={data.session?.user} />
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
