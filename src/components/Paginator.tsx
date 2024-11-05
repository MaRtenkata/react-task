import styles from '../styles/Paginator.module.css';

interface PaginationProps {
  handlePageNumberClick: (pageNumber: number) => void;
  currentPage: number;
  pageNumbers: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  handlePageNumberClick,
  pageNumbers,
  currentPage,
}) => {
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
