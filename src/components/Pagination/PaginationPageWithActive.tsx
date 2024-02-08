import React from 'react';
import cn from 'classnames/bind';
import PaginationPage from './PaginationPage';

// interface IProps extends PaginationPageProps {
//   isActive: boolean;
// }

function PaginationPageWithActive({
  isDarkTheme,
  isActive,
  className,
  ...other
}) {
  return <PaginationPage
    isDarkTheme={isDarkTheme}
    className={cn(className, {
      PaginationPageWithActive: isActive,
      'PaginationPageWithActive--dark': isDarkTheme && isActive,
    })}
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...other}
  />;
}

export default PaginationPageWithActive;
