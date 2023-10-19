import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  NewTransactionType,
  Overlay,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  //type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  function handleCreateNewTransaction(dataForm: NewTransactionFormInputs) {
    console.log(dataForm);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register("description")}
            type="text"
            placeholder="Descrição"
            required
          />
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Preço"
            required
          />
          <input
            {...register("category")}
            type="text"
            placeholder="Categoria"
            required
          />

          <NewTransactionType>
            <TransactionTypeButton value="income" variant="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton value="outcome" variant="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </NewTransactionType>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
