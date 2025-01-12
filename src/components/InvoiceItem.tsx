import { CalendarDays, Download, Receipt } from "lucide-react";

interface InvoiceItemProps {
  id: string;
  date: string;
  amount: number;
  items: number;
  status: "paid" | "pending" | "failed";
}

function InvoiceItem({ id, date, amount, items, status }: InvoiceItemProps) {
  const statusStyles = {
    paid: "bg-green-500/10 text-green-500",
    pending: "bg-yellow-500/10 text-yellow-500",
    failed: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-blue-500/20 hover:bg-blue-500/5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
          <Receipt className="h-5 w-5" />
        </div>

        <div>
          <div className="font-medium">Invoice #{id}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {date}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="font-medium">{amount} RON</div>
          <div className="text-sm text-muted-foreground">{items} items</div>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
        >
          {status}
        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity hover:bg-blue-500/10 group-hover:opacity-100">
          <Download className="h-4 w-4 text-blue-500" />
        </button>
      </div>
    </div>
  );
}

export default InvoiceItem;
