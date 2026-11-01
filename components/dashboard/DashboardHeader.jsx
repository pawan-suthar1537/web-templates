import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";
import {
  SignedIn,
  useUser,
  UserButton,
} from "@clerk/nextjs";

const DashboardHeader = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

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
                    <div className="w-full space-y-2 mt-4">
                      <Link href="/dashboard" className="block">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <LayoutDashboard size={18} className="mr-2" />
                          My Templates
                        </Button>
                      </Link>
                      <Link href="/dashboard/projects/new" className="block">
                        <Button
                          className="w-full justify-start bg-primary hover:bg-primary/90"
                        >
                          <Plus size={18} className="mr-2" />
                          Upload New Template
                        </Button>
                      </Link>
                    </div>
                    <UserButton afterSignOutUrl="/" />
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
