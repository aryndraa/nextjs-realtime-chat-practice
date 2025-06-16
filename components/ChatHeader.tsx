"use client";
import React from "react";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./ChatPresence";
import { supabaseBrowser } from "@/utils/supabase/browser";
import AuthDialog from "./AuthDialog";

export default function ChatHeader({ user }: { user: User | undefined }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Daily Chat</h1>
          <ChatPresence />
        </div>
        {user ? <Button onClick={handleLogout}>Logout</Button> : <AuthDialog />}
      </div>
    </div>
  );
}
