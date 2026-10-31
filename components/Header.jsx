import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { Cloud } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="flex min-h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href={"/"}
            className="flex items-center space-x-3 text-primary font-bold tracking-tight"
          >
            <Badge className="h-9 w-9 rounded-lg p-0">
              <Cloud
                width={28}
                height={28}
              />
            </Badge>
            <span className="self-center whitespace-nowrap text-xl font-bold tracking-tight">
              CodeSnap
            </span>
          </Link>
          {/* menu icon for mobile */}
          <div className="flex items-center gap-2 md:gap-3">
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Log in</button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent">Sign up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
