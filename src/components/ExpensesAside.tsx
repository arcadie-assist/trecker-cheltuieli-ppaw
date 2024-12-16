"use client";

import { useExpenses } from "@/hooks/expense.hooks";
import { useTodayReceipts } from "@/hooks/receipt.hooks";
import { Banknote, Flame } from "lucide-react";
import React from "react";

function ExpensesAside() {
  const { data } = useExpenses();
  const { data: receipts } = useTodayReceipts();

  console.log(receipts);
  return (
    <aside className="relative w-80">
      <div className="absolute flex flex-col inset-0">
        <div className="flex items-center justify-between flex-shrink-0 p-4 border border-gray-200 bg-gray-50 rounded-t-md">
          <h2 className="text-lg font-bold text-gray-800">Spent Today</h2>
          <div className="text-blue-500 border border-gray-200 font-bold bg-white px-2 py-1 rounded-md">
            {data?.reduce((acc, curr) => acc + curr.amount, 0)} lei
          </div>
        </div>

        <ul className="bg-white rounded-b-md border border-t-0 border-gray-200 overflow-y-scroll">
          {data?.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer flex items-center gap-4 bg-white hover:bg-gray-50 p-4 border-b border-gray-200 last:border-b-0 select-none"
            >
              <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Banknote size={16} color="white" />
              </div>
              <p className="flex-1 text-gray-800 text-sm">{item.name}</p>
              <p className="text-gray-800 font-bold text-sm">
                {item.amount} lei
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default ExpensesAside;
