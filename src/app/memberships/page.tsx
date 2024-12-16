"use client";

import { useMemberships } from "@/hooks/membership.hooks";
import React from "react";

import MembershipCard from "@/components/MembershipCard";

const MembershipsPage = () => {
  const { data, error, isLoading } = useMemberships();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Memberships</h1>
      {!!data && (
        <div className="flex flex-wrap gap-4">
          {data.map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MembershipsPage;
