import React from 'react';
import classNames from 'classnames';
import PaginationPage, { PaginationPageProps } from './PaginationPage';

interface IProps extends PaginationPageProps {
  isDarkTheme: boolean;
  isActive: boolean;
  className?: string;
}

function PaginationPageWithActive({
  isDarkTheme,
  isActive,
  className,
  ...other
}: IProps) {

  const cx = classNames({
    'PaginationPageWithActive': isActive,
    'PaginationPageWithActive--dark': isDarkTheme && isActive,
  });

  return (
    <PaginationPage
      isDarkTheme={isDarkTheme}
      className={cx}
      /* Решил, что имею право делать так в коде, который писал не я */
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    />
  );
}

export default PaginationPageWithActive;
