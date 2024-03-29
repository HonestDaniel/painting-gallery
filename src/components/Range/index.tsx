import React, { ReactNode, useRef, useState } from 'react';
import cn from 'classnames/bind';
import Arrow from '../Arrow';
import styles from './Range.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';

const cx = cn.bind(styles);

export interface IRange {
  /**
   * Specify an optional className to be applied to the select box
   */
  children: ReactNode;

  className?: string;
  /**
   * Current theme
   */
  isDarkTheme: boolean;
  /**
   * Function called when the dropdown is closed
   */
  onClose: () => void;
}

function Range({
  children,
  isDarkTheme,
  className,
  onClose,
}: IRange) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const hideMenu = () => {
    setIsOpen(false);
    onClose();
  };

  useOutsideClick(ref, hideMenu);

  return (
    <div
      ref={ref}
      className={cx(className, 'Range', {
        'Range--open': isOpen,
        'Range--dark': isDarkTheme,
      })}
      aria-hidden='true'
      onClick={isOpen ? hideMenu : openMenu}>
      <span className={cx('Range__title')}>Created</span>
      <Arrow className={cx('Range__arrow')} isOpen={isOpen} isDarkTheme={isDarkTheme} />
      {isOpen && (
        <div
          className={cx('Range__сontainer', {
            'Range__сontainer--open': isOpen,
            'Range__сontainer--dark': isDarkTheme,
          })}
          onClick={(e) => e.stopPropagation()}
          aria-hidden='true'>
          {children}
        </div>
      )}
    </div>
  );
};

export default Range;
