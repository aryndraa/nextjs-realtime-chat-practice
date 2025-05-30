import ChatHeader from "@/components/ui/ChatHeader";
import { Input } from "@/components/ui/input";
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
          <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
            <div className="flex-1 "></div>
            <div className="space-y-7">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
                return (
                  <div className="flex gap-2 " key={value}>
                    <div className="size-10 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <h1 className="font-bold">Sokheng</h1>
                        <h2 className="text-sm text-gray-400">
                          {new Date().toDateString()}
                        </h2>
                      </div>
                      <p className="text-gray-300">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Facilis, maiores. ipsum dolor sit amet consectetur
                        adipisicing elit. Facilis, maiores.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-5">
            <Input placeholder="send message" />
          </div>
        </div>
      </div>
      <InitUser user={data.user || undefined} />
    </>
  );
}
