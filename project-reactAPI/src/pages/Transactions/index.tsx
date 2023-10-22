import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { useContextSelector } from "use-context-selector";

import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionContext } from "../../contexts/Transactions";
import { dateFormatter, priceFormaatter } from "../../utils/formatter";

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions;
  });

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
                    {transactionItem.type === "outcome" && "- "}

                    {priceFormaatter.format(transactionItem.price)}
                  </PriceHighLight>
                </td>
                <td>{transactionItem.category}</td>
                <td>
                  {dateFormatter.format(new Date(transactionItem.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
