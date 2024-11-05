export const getPageNumbers = (totalPosts: number, postPerPage: number) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
