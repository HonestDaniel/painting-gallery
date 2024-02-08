import React from 'react';
import cn from 'classnames/bind';
import PaginationPageWithActive from './PaginationPageWithActive';
import PaginationPage from './PaginationPage';
import { ReactComponent as DoubleArrowL } from '../../images/doubleArrowL.svg';
import { ReactComponent as ArrowR } from '../../images/arrowR.svg';
import { ReactComponent as DoubleArrowR } from '../../images/doubleArrowR.svg';
import { ReactComponent as ArrowL } from '../../images/arrowL.svg';
import usePaginationSlice from '../../hooks/usePaginationSlice';
import styles from './Pagination.module.scss';

const cx = cn.bind(styles);

export type TPagination = {
  /**
   * Current theme
   */
  isDarkTheme: boolean;
  /**
   * The total number of items
   */
  pagesAmount: number;
  /**
   * The current page
   */
  currentPage: number;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * The callback function called when the current page changes
   */
  onChange: (currentPage: number) => void;
};

function Pagination({
  currentPage,
  isDarkTheme,
  pagesAmount,
  className,
  onChange,
}: TPagination) {
  const slicedPagesArray = usePaginationSlice({
    current: currentPage,
    amount: pagesAmount,
  });

  const leftArrowProps = {
    isDarkTheme,
    disabled: currentPage < 2,
  };

  const rightArrowProps = {
    isDarkTheme,
    disabled: currentPage >= pagesAmount,
  };

  return (
    <div className={cx(className, 'Pagination')}>
      {/* Решил, что имею право делать так в коде, который писал не я */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <PaginationPage {...leftArrowProps} onClick={() => onChange(1)}>
        <DoubleArrowL />
      </PaginationPage>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <PaginationPage {...leftArrowProps} onClick={() => onChange(currentPage - 1)}>
        <ArrowL />
      </PaginationPage>

      {slicedPagesArray.map((el) => (
        <PaginationPageWithActive
          isDarkTheme={isDarkTheme}
          className=''
          onClick={() => onChange(el)}
          isActive={currentPage === el}
          key={el}>
          {el}
        </PaginationPageWithActive>
      ))}
      {/* Решил, что имею право делать так в коде, который писал не я */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <PaginationPage {...rightArrowProps} onClick={() => onChange(currentPage + 1)}>
        <ArrowR />
      </PaginationPage>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <PaginationPage {...rightArrowProps} onClick={() => onChange(pagesAmount)}>
        <DoubleArrowR />
      </PaginationPage>
    </div>
  );
};

export default Pagination;
