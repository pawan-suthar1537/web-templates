import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  SignedIn,
  useUser,
  UserButton,
} from "@clerk/nextjs";

const DashboardHeader = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  async function logout() {
    await router.push("/");
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center"></div>
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-80 border-r border-border bg-background/95 pt-20 backdrop-blur-xl sm:block"
      >
        <div className="h-full overflow-y-auto px-4 py-6">
          <ul className="space-y-2 font-medium">
            <li>
              <SignedIn>
                <div className="w-full rounded-2xl border border-border bg-card shadow-xs">
                  <div className="flex flex-col items-center p-5 text-center">
                    {user && (
                      <>
                        <Image
                          src={user.imageUrl}
                          alt={user.fullName}
                          width={60}
                          height={60}
                          className="h-16 w-16 rounded-full border border-border shadow-sm"
                        />
                        <h1 className="mb-1 mt-3 text-lg font-semibold text-foreground">
                          {user.fullName}
                        </h1>
                        <span className="text-sm text-muted-foreground">
                          {user.primaryEmailAddress?.emailAddress}
                        </span>
                      </>
                    )}
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => {
                        window.location.href = "/dashboard";
                      }}
                    >
                      Dashboard
                    </Button>
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardHeader;
