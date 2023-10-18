import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const responseJson = await response.json();

    setTransactions(responseJson);
    console.log(responseJson);
  }

  useEffect(() => {
    /*  
      No async function

      fetch("http://localhost:3000/transactions")
      .then((resp) => resp.json())
      .then((data) => console.log(data));
      */

    loadTransactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transactionItem) => (
              <tr key={transactionItem.id}>
                <td width="40%"> {transactionItem.description}</td>
                <td>
                  <PriceHighLight variant={transactionItem.type}>
                    {transactionItem.price}
                  </PriceHighLight>
                </td>
                <td>{transactionItem.category}</td>
                <td>{transactionItem.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
