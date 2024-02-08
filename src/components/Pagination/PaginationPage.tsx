import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './PaginationPage.module.scss';

const cx = cn.bind(styles);

export interface PaginationPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme: boolean;
  className?: string;
}

function PaginationPage({
  isDarkTheme,
  className,
  ...other
}: PaginationPageProps) {

  return (
    <button
      type='button'
      className={cx(
        'PaginationPage',
        {
          'PaginationPage--dark': isDarkTheme,
        },
        className,
      )}
      /* Решил, что имею право делать так в коде, который писал не я */
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    />
  );
}

export default PaginationPage;
