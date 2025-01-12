"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@/hooks/user.hooks";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data } = useUser();
  const pathname = usePathname();

  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const navLinks = [
    { href: "/", label: "Expenses" },
    { href: "/invoices", label: "Invoices" },
    { href: "/memberships", label: "Memberships" },
    { href: "/scan", label: "Scan" },
  ];

  return (
    !!data && (
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
              {getInitial(data.email)}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {data.email}
            </span>
          </div>

          <nav className="flex items-center">
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    )
  );
}

export default Navbar;
