"use client"

import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [lastOrder, setLastOrder] = useState({});
  const [isLoadingPaymentStatus, setIsLoadingPaymentStatus] = useState(true);

  const fetchTransactionDetails = async (order_id) => {
    try {
      const response = await fetch("/api/transactionsDetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id }),
      });

      if (response.ok) {
        const data = await response.json();
        setLastOrder(data.transactions);
        return data.transactions;
      } else {
        console.log("Gagal mendapatkan status transaksi");
        return null;
      }
    } catch (error) {
      console.log("Terjadi kesalahan saat memuat data transaksi:", error);
      return null;
    } finally {
      setIsLoadingPaymentStatus(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ lastOrder, isLoadingPaymentStatus, fetchTransactionDetails }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  return useContext(TransactionContext);
}
