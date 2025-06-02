"use client";
import { useUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/utils/supabase/browser";
import React, { useEffect, useState } from "react";

export default function ChatPresence() {
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  type PresencePayload = {
    user_id: string;
    online_at: string;
  };

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel("room1", {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as Record<
          string,
          PresencePayload[]
        >;

        const userIds: string[] = [];

        for (const id in state) {
          const presences = state[id];
          if (Array.isArray(presences)) {
            for (const presence of presences) {
              if (presence.user_id) {
                userIds.push(presence.user_id);
              }
            }
          }
        }

        const uniqueUserCount = new Set(userIds).size;
        setOnlineUsers(uniqueUserCount);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user, supabase]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-1">
      <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
      <h1 className="text-sm text-gray-400">{onlineUsers} online</h1>
    </div>
  );
}
