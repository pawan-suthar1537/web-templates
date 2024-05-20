import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="flex flex-wrap items-center  justify-between mx-auto p-4">
          <Link
            href={"/"}
            className="flex items-center space-x-3 text-primary font-bold"
          >
            <Badge>
              <Cloud onClick={() => {
                  window.location.href = "/";
                }} width={28} height={28} />
            </Badge>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              CodeCrafter Hub
            </span>
          </Link>
          {/* menu icon for mobile */}
          <div className="hidden w-full md:flex justify-between items-center space-x-8 md:w-auto">
            {session ? (
              <Avatar
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
                className="cursor-pointer"
              >
                <AvatarImage src={session?.user?.image} width={32} height={32} />
              </Avatar>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
