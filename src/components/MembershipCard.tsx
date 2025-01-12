"use client";

import { useChooseMembership } from "@/hooks/membership.hooks";
import { useUser } from "@/hooks/user.hooks";
import { Membership } from "@prisma/client";
import { Check, CreditCard, Scan } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function MembershipCard({ membership }: { membership: Membership }) {
  const { trigger, isMutating } = useChooseMembership();
  const { mutate: refetchUser } = useUser();
  const [open, setOpen] = useState(false);

  const handleChooseMembership = async () => {
    try {
      await trigger({
        userId: 1,
        membershipId: membership.id,
      });
      await refetchUser();
      setOpen(false);
      toast.success("Membership activated successfully!");
    } catch (error) {
      toast.error("Failed to activate membership");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative flex w-full flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 text-left transition-all hover:border-blue-500/20 hover:bg-blue-500/5 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] active:scale-[0.98]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
          <CreditCard className="h-5 w-5" />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-lg font-semibold tracking-tight text-foreground">
            {membership.name}
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            One-time purchase
          </div>

          <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 mb-3">
            <Scan className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-500">
              {membership.scans} scans
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-500">
                {membership.cost}
              </span>
              <span className="text-sm text-muted-foreground">RON</span>
            </div>
          </div>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Membership</DialogTitle>
            <DialogDescription>
              You are about to purchase the {membership.name} plan. This will
              add {membership.scans} scans to your account.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <Scan className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">
                {membership.scans} scans included
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">
                {membership.cost} RON one-time payment
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleChooseMembership}
              disabled={isMutating}
              className="gap-2"
            >
              {isMutating ? (
                "Processing..."
              ) : (
                <>
                  <Check className="h-4 w-4" /> Confirm Purchase
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MembershipCard;
