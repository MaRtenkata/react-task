// Pagination Component
interface PaginationProps {
  totalPosts: number;
  handlePageNumberClick: (pageNumber: number) => void;
  currentPage: number;
  postPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  handlePageNumberClick,
  currentPage,
  postPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            onClick={() => handlePageNumberClick(number)}
            style={{ fontWeight: number === currentPage ? 'bold' : 'normal' }}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
