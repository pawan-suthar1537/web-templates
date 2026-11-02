import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";
import {
  SignedIn,
  useUser,
} from "@clerk/nextjs";

const DashboardHeader = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  const userAvatar = user?.imageUrl;
  const displayName = user?.fullName || user?.username || user?.firstName || "User";
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isMyTemplatesActive = router.pathname === "/dashboard";
  const isNewTemplateActive = router.pathname === "/dashboard/projects/new";

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
                        {userAvatar ? (
                          <Image
                            src={userAvatar}
                            alt={displayName}
                            width={64}
                            height={64}
                            unoptimized
                            className="h-16 w-16 rounded-full border border-border shadow-sm object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted text-lg font-semibold text-foreground shadow-sm">
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <h1 className="mb-1 mt-3 text-lg font-semibold text-foreground">
                          {displayName}
                        </h1>
                        <span className="text-sm text-muted-foreground break-all max-w-[220px] truncate block">
                          {userEmail}
                        </span>
                      </>
                    )}
                    <div className="w-full space-y-2.5 mt-5">
                      <Link href="/dashboard" className="block">
                        <Button
                          variant={isMyTemplatesActive ? "default" : "outline"}
                          className={`w-full justify-start transition-colors ${
                            isMyTemplatesActive ? "shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <LayoutDashboard size={18} className="mr-2.5" />
                          My Templates
                        </Button>
                      </Link>
                      <Link href="/dashboard/projects/new" className="block">
                        <Button
                          variant={isNewTemplateActive ? "default" : "outline"}
                          className={`w-full justify-start transition-colors ${
                            isNewTemplateActive ? "shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Plus size={18} className="mr-2.5" />
                          Upload New Template
                        </Button>
                      </Link>
                    </div>
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
