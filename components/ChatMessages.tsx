import React, { Suspense } from "react";
import ListMessages from "./ListMessages";
import { createClient } from "@/utils/supabase/server";
import InitMessages from "@/lib/store/InitMessages";
import { LIMIT_MESSAGE } from "@/lib/constant";

export default async function ChatMessages() {
  const supabase = createClient();

  const { data } = await (await supabase)
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={"loading..."}>
      <ListMessages />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
}
