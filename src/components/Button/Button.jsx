export const Button = ({ onLoadMore }) => (
  <button
    type="button"
    onClick={() => {
      onLoadMore();
    }}
  >
    Load more
  </button>
);
