import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionContext } from "../../contexts/Transactions";

export function Transactions() {
  const { transactions } = useContext(TransactionContext);

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
