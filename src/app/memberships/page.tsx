"use client";

import { useMemberships } from "@/hooks/membership.hooks";
import React from "react";
import MembershipCard from "@/components/MembershipCard";
import { CreditCard } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const MembershipsPage = () => {
  const { data, error, isLoading } = useMemberships();

  return (
    <div className="p-8">
      <PageHeader
        title="Memberships"
        description="Choose a membership plan to get more scans"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[180px] bg-muted rounded-lg border border-border"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MembershipsPage;
