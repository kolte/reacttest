import styles from  "./paggination.module.css";

interface pagginationProps {
  items?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: any;
}

const Pagination = ({ items, pageSize, currentPage, onPageChange }:pagginationProps) => {
    const pagesCount = Math.ceil((items? items : 1) / (pageSize?pageSize:1));
   
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
   
     return (
      <div className="w-1/3 my-10 text-end">
        <ul className={styles.pagination}>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? styles.pageItemActive : styles.pageItem
              }
            >
              <a className={styles.pageLink} onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
   };
   
   export default Pagination;