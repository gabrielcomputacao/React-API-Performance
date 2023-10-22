import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../../../../contexts/Transactions";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchTransactions(dataForm: SearchFormInputs) {
    fetchTransactions(dataForm.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        {...register("query")}
        placeholder="Busque por Transações"
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={28} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
