"use client";

import PageHeader from "@/components/PageHeader";
import InvoiceItem from "@/components/InvoiceItem";

// Dummy data
const dummyInvoices = [
  {
    id: "INV001",
    date: "2024-03-20",
    amount: 156.5,
    items: 3,
    status: "paid" as const,
  },
  {
    id: "INV002",
    date: "2024-03-18",
    amount: 89.99,
    items: 2,
    status: "pending" as const,
  },
  {
    id: "INV003",
    date: "2024-03-15",
    amount: 245.0,
    items: 5,
    status: "paid" as const,
  },
  {
    id: "INV004",
    date: "2024-03-10",
    amount: 67.5,
    items: 1,
    status: "failed" as const,
  },
];

export default function InvoicesPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Invoices"
        description="View and download your invoice history"
      />

      <div className="space-y-4">
        {dummyInvoices.map((invoice) => (
          <InvoiceItem
            key={invoice.id}
            id={invoice.id}
            date={invoice.date}
            amount={invoice.amount}
            items={invoice.items}
            status={invoice.status}
          />
        ))}

        {dummyInvoices.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No invoices yet</h3>
            <p className="text-muted-foreground">
              Your invoice history will appear here once you make a purchase
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
