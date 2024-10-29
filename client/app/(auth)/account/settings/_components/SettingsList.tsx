// SettingsList.tsx
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface SettingProps {
  setting: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SettingsList({ setting, isSelected, onClick }: SettingProps) {
  return (
    <NavigationMenu className="px-2 z-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={`?setting=${setting}`} legacyBehavior passHref>
            <NavigationMenuLink
              onClick={onClick}
              className={cn(
                "text-[16px] py-2 transition-all duration-300 ease-in-out",
                isSelected
                  ? "border-b-2 border-orange-500 translate-y-[2px]"
                  : "hover:border-b-2 hover:border-orange-300"
              )}
            >
              <span className="capitalize">{setting}</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
