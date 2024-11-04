// Pagination Component
interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  handlePageNumberClick: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  handlePageNumberClick,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
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
