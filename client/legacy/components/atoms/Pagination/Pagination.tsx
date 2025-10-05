// Pagination.tsx
import React, { useEffect, useState, memo } from 'react';
import './Pagination.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from '../Icons/Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const updateVisiblePages = (page: number) => {
    let newVisiblePages: number[] = [];

    if (totalPages <= 7) {
      newVisiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (page < totalPages - 3) {
      newVisiblePages = [page, page + 1, -1, totalPages - 1, totalPages];
    } else {
      newVisiblePages = [
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    setVisiblePages(newVisiblePages);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (page === -1) {
      const newPage = currentPage + 2;
      onPageChange(newPage);
      updateVisiblePages(newPage);
      return;
    }
    onPageChange(page);
    updateVisiblePages(page);
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, totalPages]);

  return (
    <div className="pagination-container">
      <div className="pagination-box">
        <div
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <AiOutlineArrowLeft />
        </div>

        {visiblePages.map((page, index) => (
          <div
            key={index}
            className={`pagination-page ${currentPage === page ? 'active' : ''
              } ${page === -1 ? 'dots' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page === -1 ? <span>&hellip;</span> : <span>{page}</span>}
          </div>
        ))}

        <div
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination);