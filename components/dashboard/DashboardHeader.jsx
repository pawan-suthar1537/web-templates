import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import Image from "next/image";

const DashboardHeader = () => {
  const router = useRouter();
  const { data: session } = useSession();
  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        {/* btn to toggle sidebar in mobile */}
      </div>
      <aside
        className={`fixed z-40 w-80 h-auto transition-transform -translate-x-full sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto overflow-x-auto ">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex flex-col items-center p-3">
                  <Image
                  
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    width={60} // Add width
                    height={60} // Add height
                    className="w-15 h-15 rounded-full shadow-lg"
                  />
                  <h1 className="mb-1 text-xl font-medium text-gray-900">
                    {session?.user?.name}
                  </h1>
                  <span className="text-sm text-gray-600">
                    {session?.user?.email}
                  </span>
                  <Button variant="outline" className="w-full mt-2" onClick={()=>{window.location.href = "/dashboard"}}>
                    Dashboard
                  </Button>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full mt-2"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardHeader;
