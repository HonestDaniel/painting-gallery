import React from 'react';
import cn from 'classnames/bind';
import { ReactComponent as SelectArrow } from '../../images/selectArrow.svg';
import styles from './Arrow.module.scss';

export type TArrow = {
  isOpen: boolean;
  isDarkTheme: boolean;
  className?: string;
};

const cx = cn.bind(styles);

function Arrow({
  isOpen,
  isDarkTheme,
  className,
}: TArrow) {
  return (
    <div
      className={cx(className, {
        Arrow__opened: isOpen,
        Arrow__dark: isDarkTheme,
      })}>
      <SelectArrow />
    </div>
  );
}

export default Arrow;
