"use client";
import { Home } from "lucide-react";

import { Separator } from "./ui/separator";
import Link from "next/link";
import Image from "next/image";
export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Image src="/zeztra-logo.svg" alt="Zeztra" className="h-14 w-14" width={56} height={56} />
        <Separator orientation="vertical" className="h-12" />

        <nav className="lg:space-x6 flex items-center space-x-4">
          <Link
            href="/"
            data-current={true}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
      </div>
    </div>
  );
}
