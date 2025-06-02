"use client";

import React from "react";
import { Input } from "./ui/input";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { Imessage, useMessage } from "@/lib/store/messages";

export default function ChatInput() {
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();

  const addMessage = useMessage((state) => state.optimisticAddMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const newMessage = {
        id: uuidv4(),
        text,
        send_by: user?.id,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.user_name,
        },
      };

      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);

      const { error } = await supabase.from("messages").insert({
        id: newMessage.id,
        text: newMessage.text,
        send_by: newMessage.send_by,
      });

      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Messages can't be empty!!");
    }
  };

  return (
    <div className="p-5">
      <Input
        type="text"
        placeholder="send message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
