import {Button} from "@/components/ui/button";
import {User} from "lucide-react";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";


export function Login() {

  const {data: session, status} = useSession()

  return (
    <>
      {status == "authenticated" ? (
        <div className={"flex items-center space-x-4"}>
          <p>Signed in as {session.user?.name ?? "User"}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <Button asChild>
          <Link href="/api/auth/signin">
            <User className="mr-2 h-4 w-4"/> Login with GitHub
          </Link>
        </Button>
      )}
    </>
  )
}