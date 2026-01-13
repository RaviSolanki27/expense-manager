"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, fetchUserData } from "@/store/slices/userSlice";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Bell, BellDotIcon, Search } from "lucide-react";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  // Fetch user data when component mounts
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  // Get the first letter of the user's name or email for the avatar
  const getInitials = () => {
    if (!user) return "U";
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <header className="bg-background  px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold ">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <h4 className="label-sm">
            It's the best time to manage your finances
          </h4>
        </div>
        <div className="flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <span className="p-3 border rounded-full">
            <Search />
          </span>
          <span className="p-3 border rounded-full">
            <Bell />
          </span>
          <span className="flex border rounded-full p-1 gap-2 pr-3 items-center">
            {user?.image ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border">
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium border">
                {getInitials()}
              </div>
            )}
            <span className="flex flex-col">

            <span className="">{user?.name || "User"}</span>
            <span className="text-sm-secondary">{user?.email || "User"}</span>
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
