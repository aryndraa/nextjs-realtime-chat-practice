import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/utils/supabase/browser";

export default function AuthDialog() {
  const handleLoginWithGithub = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLoginWithGoogle = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in Account</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
        </DialogHeader>
        <div className="mt-5 flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full py-6"
            onClick={handleLoginWithGoogle}
          >
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full py-6"
            onClick={handleLoginWithGithub}
          >
            Github
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
