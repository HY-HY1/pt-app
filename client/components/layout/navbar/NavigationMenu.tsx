"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/auth/logout";

interface NavMenuProps {
  authenticated: boolean;
  user: any

}

export function NavMenu({ authenticated, user }: NavMenuProps) {
  console.log("🚀 ~ NavMenu ~ authenticated:", authenticated)
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/affiliate" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Become an Affiliate
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/onboarding" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Start Selling
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {authenticated ? (
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex flex-row items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-blue-300"></div>
                    <div className="ml-2 transition-all hover:rotate-90">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </NavigationMenuLink>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user.name.firstName}'s Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={'/dashboard'}><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                <Link href={'/account/settings'}><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {logout()}}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        ) : (
          <>
            <Link href={'/account?login=true'}><Button variant={"ghost"}>Login</Button></Link>
            <Link href={'/account'}><Button variant={"outline"}>Register</Button></Link>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
