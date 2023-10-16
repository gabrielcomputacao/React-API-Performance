import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por Transações" />
      <button type="submit">
        <MagnifyingGlass size={28} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
