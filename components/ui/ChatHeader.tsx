'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { supabaseBrowser } from '@/utils/supabase/browser';

export default function ChatHeader() {
  const [user, setUser] = useState<any>(null);
  const supabase = supabaseBrowser();

  // Cek status login saat komponen dimuat
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };


    getUser();

    // Optional: subscribe ke perubahan auth (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

    console.log(user);
  async function handleLoginWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`, // sesuaikan jika kamu pakai route ini
        scopes: 'read:user user:email',
      },
    });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
      <div className="h-20">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold mb-2">Daily Chat</h1>
            <div className="flex items-center gap-1">
              <div className="size-4 bg-green-500 rounded-full animate-pulse"></div>
              <h1 className="text-sm text-gray-400">
                {user ? 'Online' : 'Offline'}
              </h1>
            </div>
          </div>
          {user ? (
              <Button onClick={handleLogout}>Logout</Button>
          ) : (
              <Button onClick={handleLoginWithGithub}>Login</Button>
          )}
        </div>
      </div>
  );
}
