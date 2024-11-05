import styles from '../styles/Paginator.module.css';

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
    <ul className={styles.container}>
      {pageNumbers.map((number) => (
        <li className={styles.containerItem} key={number}>
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
