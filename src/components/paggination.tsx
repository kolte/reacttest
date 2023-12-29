interface pageProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface pageNumberProps extends pageProps {
  page: number;
}

interface paginationProps extends pageProps {
  pageSize: number;
  items: number;
}

const PageNumber = ({ page, onPageChange, currentPage }: pageNumberProps) => {
  const activeClass = currentPage === page ? "bg-black text-white" : "";

  return (
    <li
      key={page}
      className={`flex justify-center items-center w-8 h-8 border border-solid border-gray-200 rounded-lg cursor-pointer ${activeClass}`}
    >
      <a className="cursor-pointer" onClick={() => onPageChange(page)}>
        {page}
      </a>
    </li>
  );
};

const Pagination = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}: paginationProps) => {
  const pagesCount = Math.ceil((items ? items : 1) / (pageSize ? pageSize : 1));

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div className="w-1/3 my-10 text-end mx-auto">
      <ul className="flex justify-between items-center list-none">
        {pages.map((page) => (
          <PageNumber
            key={page}
            page={page}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
