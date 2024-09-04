import {
  Container,
  SearchButton,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ search }) => {
  return (
    <Container>
      <SearchForm
        onSubmit={e => {
          search(e);
        }}
      >
        <SearchButton type="submit">
          <span>
            <b>Search</b>
          </span>
        </SearchButton>

        <SearchInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Container>
  );
};
