"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@/hooks/user.hooks";

function Navbar() {
  const { data } = useUser();
  return (
    !!data && (
      <div>
        Hello, {data.email}
        You have {data.scans_remaining} scans remaining
        <nav className="flex gap-4">
          <Link href="/quick-expenses">Quick Expenses</Link>
          <Link href="/invoices">Invoices</Link>
          <Link href="/memberships">Memberships</Link>
          <Link href="/scan">Scan receipt</Link>
        </nav>
      </div>
    )
  );
}

export default Navbar;
