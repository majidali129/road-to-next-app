"use client";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { AccountDropdown } from "./account-dropdown";
const Header = () => {
  const { isFetched, user } = useAuth();

  if (!isFetched) return null;

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link href={signInPath()} className={buttonVariants({ variant: "outline" })}>
        Sign In
      </Link>
      <Link href={signUpPath()} className={buttonVariants({ variant: "default" })}>
        Sign Up
      </Link>
    </>
  );

  return (
    <nav className="flex justify-between py-2.5 px-5 border-b  fixed left-0 ring-0 top-0 z-20 w-full bg-background/60 backdrop-blur-md animate-header-from-top">
      <div className="flex align-middle gap-x-1.5">
        <Link className={buttonVariants({ variant: "ghost" })} href={homePath()}>
          <LucideKanban className=" scale-110" />
          <h1 className=" ml-2 text-lg font-semibold">Ticketbounty</h1>
        </Link>
      </div>
      <div className="flex align-middle gap-x-1.5">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};
export default Header;
