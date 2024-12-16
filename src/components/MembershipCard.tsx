"use client";

import { Button } from "@/components/ui/button";
import { useChooseMembership, useMemberships } from "@/hooks/membership.hooks";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DialogFooter,
  DialogContent,
  DialogDescription,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Membership } from "@prisma/client";
import { useUser } from "@/hooks/user.hooks";

function MembershipCard({ membership }: { membership: Membership }) {
  const { trigger, isMutating } = useChooseMembership();
  const { mutate: refetchUser } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-64">
      <CardHeader>
        <h3 className="text-lg font-semibold">{membership.name}</h3>
      </CardHeader>
      <CardContent>
        <p>{membership.cost} RON</p>
        <p>{membership.scans} scanari</p>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Choose</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{membership.name}</DialogTitle>
              <DialogDescription>
                You are about to choose this membership: {membership.name}. Are
                you sure you want to proceed with the payment?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4"></div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">No</Button>
              </DialogClose>
              <Button
                disabled={isMutating}
                onClick={() =>
                  trigger({
                    userId: 1,
                    membershipId: membership.id,
                  }).then(() => {
                    refetchUser();
                    setOpen(false);
                  })
                }
              >
                Yes, I am sure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default MembershipCard;
