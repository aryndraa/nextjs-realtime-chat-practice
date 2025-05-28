import ChatHeader from "@/components/ui/ChatHeader";
import React from "react";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto md:py-10 h-screen">
      <div className="h-full border rounded-md">
        <ChatHeader />
      </div>
    </div>
  );
}
