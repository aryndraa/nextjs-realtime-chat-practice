import React from "react";

export default function ChatAbout() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3 md:space-y-5 flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome to Daily Chat</h1>
        <p className="w-64 lg:w-96">
          This is a chat application that power by supabase realtime db. Login
          to send message
        </p>
      </div>
    </div>
  );
}
